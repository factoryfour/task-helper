/* eslint
import/no-dynamic-require: 'off'
*/

const { describe, it } = require('mocha');
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

const { Datapoint, TaskOutput } = require(root + '/index.js');

describe('Task Output Methods', () => {
	it('task-output-1 - Initialize an empty object', (done) => {
		const tout = new TaskOutput();
		(tout.datapoints instanceof Array).should.be.true();
		(tout.notifications instanceof Array).should.be.true();
		(tout.assignments instanceof Array).should.be.true();
		done();
	});

	it('task-output-2 - Generate when empty', (done) => {
		const tout = new TaskOutput();
		(tout.generate() instanceof Object).should.be.true();
		done();
	});

	it('task-output-3 - Add datapoint objects', (done) => {
		const tout = new TaskOutput();
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setValue('hello');
		const dp2 = new Datapoint().setType('test-type').setFormat('number').setValue(52);
		tout.addDatapoint(dp1).addDatapoint(dp2.data);
		should.equal(tout.datapoints.length, 2);
		(tout.generate() instanceof Object).should.be.true();
		done();
	});

	it('task-output-4 - Add notification objects', (done) => {
		const tout = new TaskOutput();
		const nt1 = { value: 'hello' };
		const nt2 = { value: 'world' };
		tout.addNotification(nt1).addNotification(nt2);
		should.equal(tout.notifications.length, 2);
		(tout.generate() instanceof Object).should.be.true();
		done();
	});

	it('task-output-5 - Add assignment objects', (done) => {
		const tout = new TaskOutput();
		const as1 = { value: 'goodnight' };
		const as2 = { value: 'moon' };
		tout.addAssignment(as1).addAssignment(as2);
		should.equal(tout.assignments.length, 2);
		(tout.generate() instanceof Object).should.be.true();
		done();
	});

	it('task-output-6 - Generate with stuff', (done) => {
		const tout = new TaskOutput();
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setValue('hello');
		const dp2 = new Datapoint().setType('test-type').setFormat('number').setValue(52);
		tout.addDatapoint(dp1).addDatapoint(dp2.data);
		const nt1 = { value: 'hello' };
		const nt2 = { value: 'world' };
		tout.addNotification(nt1).addNotification(nt2);
		const as1 = { value: 'goodnight' };
		const as2 = { value: 'moon' };
		tout.addAssignment(as1).addAssignment(as2);
		(tout.generate() instanceof Object).should.be.true();
		done();
	});

	it('task-output-7a - Cant add non-Objects: datapoints', (done) => {
		const tout = new TaskOutput();
		should(() => { tout.addDatapoint('not an object'); }).throwError();
		done();
	});

	it('task-output-7b - Cant add non-Objects: notifications', (done) => {
		const tout = new TaskOutput();
		should(() => { tout.addNotification('not an object'); }).throwError();
		done();
	});

	it('task-output-7c - Cant add non-Objects: assignments', (done) => {
		const tout = new TaskOutput();
		should(() => { tout.addAssignment('not an object'); }).throwError();
		done();
	});

	it('task-output-8 - Stringify', (done) => {
		const tout = new TaskOutput();
		should.equal(typeof tout.toString(), 'string');
		done();
	});
});
