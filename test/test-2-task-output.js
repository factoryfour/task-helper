/* eslint
import/no-dynamic-require: 'off'
*/

const test = require('ava');
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

test('task-output-1 - Initialize an empty object', (t) => {
	const tout = new TaskOutput();
	t.true(tout.datapoints instanceof Array);
	t.true(tout.notifications instanceof Array);
	t.true(tout.assignments instanceof Array);
});

test('task-output-2 - Generate when empty', (t) => {
	const tout = new TaskOutput();
	t.true(tout.generate() instanceof Object);
});

test('task-output-3 - Add datapoint objects', (t) => {
	const tout = new TaskOutput();
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	dp1.setCustomPermissions('lalala');
	dp1.setParent('mother');
	const dp2 = new Datapoint().setType('test-type').setFormat('number').setContent(52);
	dp2.setCustomPermissions('lalala');
	dp2.setParent('father');
	tout.addDatapoint(dp1).addDatapoint(dp2.data);
	t.true(tout.datapoints.length == 2);
	t.true(tout.generate() instanceof Object);
});

test('task-output-4 - Add notification objects', (t) => {
	const tout = new TaskOutput();
	const nt1 = { value: 'hello' };
	const nt2 = { value: 'world' };
	tout.addNotification(nt1).addNotification(nt2);
	t.true(tout.notifications.length == 2);
	t.true(tout.generate() instanceof Object);
});

test('task-output-5 - Add assignment objects', (t) => {
	const tout = new TaskOutput();
	const as1 = { value: 'goodnight' };
	const as2 = { value: 'moon' };
	tout.addAssignment(as1).addAssignment(as2);
	t.true(tout.assignments.length == 2);
	t.true(tout.generate() instanceof Object);
});

test('task-output-6 - Generate with stuff', (t) => {
	const tout = new TaskOutput();
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	dp1.setCustomPermissions('lalala');
	dp1.setParent('mother');
	const dp2 = new Datapoint().setType('test-type').setFormat('number').setContent(52);
	tout.addDatapoint(dp1).addDatapoint(dp2.data);
	const nt1 = { value: 'hello' };
	const nt2 = { value: 'world' };
	tout.addNotification(nt1).addNotification(nt2);
	const as1 = { value: 'goodnight' };
	const as2 = { value: 'moon' };
	tout.addAssignment(as1).addAssignment(as2);
	t.true(tout.generate() instanceof Object);
});

test('task-output-7a - Cant add incomplete datapoints', (t) => {
	const tout = new TaskOutput();
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	tout.addDatapoint(dp1);
	t.throws(() => { tout.generate(); });
});

test('task-output-7b - Cant add non-Objects: datapoints', (t) => {
	const tout = new TaskOutput();
	t.throws(() => { tout.addDatapoint('not an object'); });
});

test('task-output-7c - Cant add non-Objects: notifications', (t) => {
	const tout = new TaskOutput();
	t.throws(() => { tout.addNotification('not an object'); });
});

test('task-output-7d - Cant add non-Objects: assignments', (t) => {
	const tout = new TaskOutput();
	t.throws(() => { tout.addAssignment('not an object'); });
});

test('task-output-8 - Stringify', (t) => {
	const tout = new TaskOutput();
	t.true(typeof tout.toString() == 'string');
});
