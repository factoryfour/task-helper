/* eslint
import/no-dynamic-require: 'off'
*/

const test = require('ava');
// const { describe, it } = require('mocha');
// const should = require('should');
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

test('datapoints-1a - Initialize an empty datapoint', (t) => {
	const dp1 = new Datapoint();
	t.is(dp1.format, null);
	t.is(dp1.type, null);
	t.is(dp1.content.value, null);
});

test('datapoints-1b - Initialize a datapoint with a type', (t) => {
	const dp1 = new Datapoint('test-type');
	t.is(dp1.format, null);
	t.true(dp1.type == 'test-type');
	t.is(dp1.content.value, null);
});

test('datapoints-1c - Initialize a datapoint with a type and format (string)', (t) => {
	const dp1 = new Datapoint('test-type', 'string');
	t.true(dp1.format == 'string');
	t.true(dp1.type == 'test-type');
	t.is(dp1.content.value, null);
});

test('datapoints-1d - Initialize a datapoint with a type and format (number)', (t) => {
	const dp1 = new Datapoint('test-type', 'number');
	t.true(dp1.format == 'number');
	t.true(dp1.type == 'test-type');
	t.is(dp1.content.value, null);
});

test('datapoints-2 - Set type', (t) => {
	const dp1 = new Datapoint();
	dp1.setType('test-type');
	t.true(dp1.type == 'test-type');
});

test('datapoints-3 - Set format', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('string');
	t.true(dp1.format == 'string');
});

test('datapoints-4a - Set content: string', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('string');
	dp1.setContent({ value: 'fifty-two' });
	t.true(dp1.content.value == 'fifty-two');
});

test('datapoints-4b - Set content: number', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('number');
	dp1.setContent({ value: 52 });
	t.true(dp1.content.value == 52);
});

test('datapoints-4c - Set content with title: string', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('string');
	dp1.setContent({ title: 'a_number', value: 'fifty-two' });
	t.true(dp1.content.value == 'fifty-two');
});

test('datapoints-4d - Set content with value: string', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('string');
	dp1.setContent('fifty-two');
	t.true(dp1.content.value == 'fifty-two');
});

test('datapoints-4e - Set content with value: number', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('number');
	dp1.setContent(52);
	t.true(dp1.content.value == 52);
});

test('datapoints-5 - Cannot set invalid type', (t) => {
	const dp1 = new Datapoint();
	t.throws(() => { dp1.setType(1); });
});

test('datapoints-6 - Cannot set invalid format', (t) => {
	const dp1 = new Datapoint();
	t.throws(() => { dp1.setFormat(1); });
});

test('datapoints-7 - Must have format for value', (t) => {
	const dp1 = new Datapoint();
	t.throws(() => { dp1.setContent(1); });
});

test('datapoints-8 - Value type must match format', (t) => {
	const dp1 = new Datapoint();
	dp1.setFormat('string');
	t.throws(() => { dp1.setContent(1); });
});

test('datapoints-9 - Set parent', (t) => {
	const dp1 = new Datapoint();
	dp1.setParent('mama');
	t.true(dp1.parent == 'mama');
});

test('datapoints-10 - Set custom permissions', (t) => {
	const dp1 = new Datapoint();
	dp1.setCustomPermissions('ppp');
	t.true(dp1.permissions == 'ppp');
});

test('datapoints-11 - Set permissions with JSON', (t) => {
	const newPerms = {
		GET: [],
		PUT: [],
		DELETE: []
	};
	const dp1 = new Datapoint();
	dp1.setPermissions(newPerms);
	t.true(typeof dp1.permissions == 'object');
	t.true(dp1.permissions.GET.length == 0);
	t.true(dp1.permissions.PUT.length == 0);
	t.true(dp1.permissions.DELETE.length == 0);
});

test('datapoints-12 - Add permissions', (t) => {
	const dp1 = new Datapoint();
	dp1.addPermission('GET', 'bruce');
	dp1.addPermission('PUT', 'clark');
	dp1.addPermission('DELETE', 'diana');
	t.true(typeof dp1.permissions == 'object');
	t.true(dp1.permissions.GET.length == 1);
	t.true(dp1.permissions.PUT.length == 1);
	t.true(dp1.permissions.DELETE.length == 1);
});

test('datapoints-13a - No permissions override with custom', (t) => {
	const dp1 = new Datapoint();
	dp1.addPermission('GET', 'asdf');
	t.throws(() => { dp1.setCustomPermissions('uh oh'); });
});

test('datapoints-13b - No permissions override with set', (t) => {
	const newPerms = {
		GET: [],
		PUT: [],
		DELETE: []
	};
	const dp1 = new Datapoint();
	dp1.setCustomPermissions('uh oh');
	t.throws(() => { dp1.setPermissions(newPerms); });
});

test('datapoints-14 - Chain commands', (t) => {
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	t.true(dp1.format == 'string');
	t.true(dp1.type == 'test-type');
	t.true(dp1.content.value == 'hello');
});

test('datapoints-15 - Generate', (t) => {
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	dp1.setCustomPermissions('lalala');
	dp1.setParent('mother');
	const dat = dp1.generate();
	t.true(typeof dat == 'object');
});

test('datapoints-16a - Fail generate: missing type', (t) => {
	const dp1 = new Datapoint().setFormat('string').setContent({ value: 'hello' });
	dp1.setCustomPermissions('lalala');
	dp1.setParent('mother');
	t.throws(() => { dp1.generate(); });
});

test('datapoints-16b - Fail generate: missing format/value', (t) => {
	const dp1 = new Datapoint().setType('test-type');
	dp1.setCustomPermissions('lalala');
	dp1.setParent('mother');
	t.throws(() => { dp1.generate(); });
});

test('datapoints-16c - Fail generate: missing parent', (t) => {
	const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
	dp1.setCustomPermissions('lalala');
	t.throws(() => { dp1.generate(); });
});

test('datapoints-17 - Stringify', (t) => {
	const dp1 = new Datapoint();
	dp1.setType('test-type').setFormat('string').setContent({ value: 'hello' });
	t.true(typeof dp1.toString() == 'string');
});
