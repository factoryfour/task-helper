const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const jwksFetch = (req, header, payload, cb) => {
	const issuer = `https://${req.webtaskContext.meta.DOMAIN}/`;
	const jwks = jwksRsa.expressJwtSecret({ jwksUri: `${issuer}.well-known/jwks.json` });

	return req.webtaskContext.storage.get((readError, data) => {
		if (readError) {
			return cb(readError);
		}

		const fetchedData = data || {};
		if (!fetchedData.F4_AUTHENTICATION) {
			fetchedData.F4_AUTHENTICATION = {};
		}
		const cache = fetchedData.F4_AUTHENTICATION[header.kid];
		const cacheSettings = req.webtaskContext.meta.AUTH_CACHE_TTL || 1000 * 60 * 10;
		if (cache && cache.cert && Date.now() - cache.lastFetched < cacheSettings) {
			req.cachedCert = true;
			return cb(null, cache.cert);
		}

		return jwks(req, header, payload, (err, response) => {
			if (err) {
				return cb(err);
			}

			const updateData = Object.assign({}, fetchedData, {
				F4_AUTHENTICATION: Object.assign({}, fetchedData.F4_AUTHENTICATION, {
					[header.kid]: {
						cert: response,
						lastFetched: Date.now()
					}
				})
			});
			return req.webtaskContext.storage.set(updateData, { force: 1 }, (writeError) => {
				if (writeError) return cb(writeError);

				return cb(null, response);
			});
		});
	});
};

module.exports = (req, res, next) => jwt({
	secret: jwksFetch,
	audience: req.webtaskContext.meta.AUDIENCE,
	issuer: `https://${req.webtaskContext.meta.DOMAIN}/`,
	algorithms: ['RS256']
})(req, res, next);
