/* eslint
consistent-return: 'off',
strict: 'off'
*/

'use strict';

const { Datapoint, TaskOutput } = require('@factoryfour/task-helper');

// Main logic ===========================================================================
module.exports = function (context, done) {

	const dp1 = new Datapoint()
		.setType('sample-type')
		.setFormat('string')
		.setContent({ value: 'hello' })
		.setCustomPermissions('lalala')
		.setParent('mother');

	const output = new TaskOutput().addDatapoint(dp1);

	done(null, output);
};
