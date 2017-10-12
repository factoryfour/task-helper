/* eslint
import/no-dynamic-require: 'off'
*/

const should = require('should');
const os = require('os');

// Check platform to handle file path issues
let root;
const isWin = os.platform().indexOf('win32') > -1;
if (isWin) {
	root = __dirname.substring(0, __dirname.lastIndexOf('\\'));
} else {
	root = __dirname.substring(0, __dirname.lastIndexOf('/'));
}

const { Datapoint } = require(root + '/index.js');

describe('Datapoint Methods', function () {
	it('datapoints-1 - Initialize an empty datapoint', (done) => {
		const dp1 = new Datapoint();
		should.equal(dp1.format, null);
		should.equal(dp1.type, null);
		should.equal(dp1.content.value, null);
		done();
	});

	it('datapoints-2 - Set type', (done) => {
		const dp1 = new Datapoint();
		dp1.setType('string');
		should.equal(dp1.type, 'string');
		done();
	});

	it('datapoints-3 - Set format', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		should.equal(dp1.format, 'string');
		done();
	});

	it('datapoints-4a - Set value: string', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		dp1.setValue('fifty-two');
		should.equal(dp1.content.value, 'fifty-two');
		done();
	});

	it('datapoints-4b - Set value: number', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('number');
		dp1.setValue(52);
		should.equal(dp1.content.value, 52);
		done();
	});

	it('datapoints-5 - Cannot set invalid type', (done) => {
		const dp1 = new Datapoint();
		should(() => { dp1.setType(1); }).throwError();
		done();
	});

	it('datapoints-6 - Cannot set invalid format', (done) => {
		const dp1 = new Datapoint();
		should(() => { dp1.setFormat(1); }).throwError();
		done();
	});

	it('datapoints-7 - Must have format for value', (done) => {
		const dp1 = new Datapoint();
		should(() => { dp1.setValue(1); }).throwError();
		done();
	});

	it('datapoints-8 - Value type must match format', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		should(() => { dp1.setValue(1); }).throwError();
		done();
	});

	it('datapoints-9 - Chain commands', (done) => {
		const dp1 = new Datapoint();
		dp1.setType('string').setFormat('string').setValue('hello');
		should.equal(dp1.format, 'string');
		should.equal(dp1.type, 'string');
		should.equal(dp1.content.value, 'hello');
		done();
	});

	it('datapoints-10 - Stringify', (done) => {
		const dp1 = new Datapoint();
		dp1.setType('string').setFormat('string').setValue('hello');
		should.equal(typeof dp1.toString(), 'string');
		done();
	});


});

