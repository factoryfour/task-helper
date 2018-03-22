const dpts = require('./src/datapoint.js');
const tout = require('./src/task_output.js');
const expressAuth = require('./src/expressAuth.js');

module.exports = {
	Datapoint: dpts,
	TaskOutput: tout,
	ExpressAuth: expressAuth,
};
