/* eslint
valid-typeof: 'off'
*/

class Datapoint {
	constructor(type) {
		// Initialize the body property
		const body = {};
		Object.defineProperty(body, 'body', {
			enumerable: false,
			configurable: false,
			writable: false
		});
		this.body = body;
		// Declare empty JSON as body to store values
		this.body.type = null;
		this.body.format = null;
		this.body.content = {
			value: null
		};
		// Add type
		const dpType = type || null;
		this.body.type = dpType;
	}

	// Getters
	get data() {
		return this.body;
	}

	get format() {
		return this.body.format;
	}

	get type() {
		return this.body.type;
	}

	get content() {
		return this.body.content;
	}

	// Setters
	setType(type) {
		if (typeof type === 'string') {
			this.body.type = type;
			return this;
		}
		const typeErr = 'Type must be a valid string';
		throw Error(typeErr);
	}

	setFormat(format) {
		if (typeof format === 'string') {
			this.body.format = format;
			return this;
		}
		const typeErr = 'Type must be a valid string representing a type';
		throw Error(typeErr);
	}

	setValue(val) {
		if (!this.body.format) {
			const fmtError = 'Datapoint does not have a format specified.';
			throw Error(fmtError);
		} else if (typeof val != this.body.format) {
			const fmtError = `Value type must match format: ${this.body.format}`;
			throw Error(fmtError);
		}
		this.body.content.value = val;
		return this;
	}

	toString() {
		return JSON.stringify(this.body);
	}

}

module.exports = Datapoint;
