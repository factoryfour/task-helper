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

const { Datapoint } = require(root + '/index.js');

describe('Datapoint Methods', () => {
	it('datapoints-1a - Initialize an empty datapoint', (done) => {
		const dp1 = new Datapoint();
		should.equal(dp1.format, null);
		should.equal(dp1.type, null);
		should.equal(dp1.content.value, null);
		should.exist(dp1.data);
		done();
	});

	it('datapoints-1b - Initialize a datapoint with a type', (done) => {
		const dp1 = new Datapoint('test-type');
		should.equal(dp1.format, null);
		should.equal(dp1.type, 'test-type');
		should.equal(dp1.content.value, null);
		should.exist(dp1.data);
		done();
	});

	it('datapoints-1c - Initialize a datapoint with a type and format (string)', (done) => {
		const dp1 = new Datapoint('test-type', 'string');
		should.equal(dp1.type, 'test-type');
		should.equal(dp1.format, 'string');
		should.equal(dp1.content.value, null);
		should.exist(dp1.data);
		done();
	});

	it('datapoints-1d - Initialize a datapoint with a type and format (number)', (done) => {
		const dp1 = new Datapoint('test-type', 'number');
		should.equal(dp1.type, 'test-type');
		should.equal(dp1.format, 'number');
		should.equal(dp1.content.value, null);
		should.exist(dp1.data);
		done();
	});

	it('datapoints-2 - Set type', (done) => {
		const dp1 = new Datapoint();
		dp1.setType('test-type');
		should.equal(dp1.type, 'test-type');
		done();
	});

	it('datapoints-3 - Set format', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		should.equal(dp1.format, 'string');
		done();
	});

	it('datapoints-4a - Set content: string', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		dp1.setContent({ value: 'fifty-two' });
		should.equal(dp1.content.value, 'fifty-two');
		done();
	});

	it('datapoints-4b - Set content: number', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('number');
		dp1.setContent({ value: 52 });
		should.equal(dp1.content.value, 52);
		done();
	});

	it('datapoints-4c - Set content with title: string', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		dp1.setContent({ title: 'a_number', value: 'fifty-two' });
		should.equal(dp1.content.value, 'fifty-two');
		done();
	});

	it('datapoints-4d - Set content with value: string', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		dp1.setContent('fifty-two');
		should.equal(dp1.content.value, 'fifty-two');
		done();
	});

	it('datapoints-4e - Set content with value: number', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('number');
		dp1.setContent(52);
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
		should(() => { dp1.setContent(1); }).throwError();
		done();
	});

	it('datapoints-8 - Value type must match format', (done) => {
		const dp1 = new Datapoint();
		dp1.setFormat('string');
		should(() => { dp1.setContent(1); }).throwError();
		done();
	});

	it('datapoints-9 - Set parent', (done) => {
		const dp1 = new Datapoint();
		dp1.setParent('mama');
		should.equal(dp1.parent, 'mama');
		done();
	});

	it('datapoints-10 - Set custom permissions', (done) => {
		const dp1 = new Datapoint();
		dp1.setCustomPermissions('ppp');
		should.equal(dp1.permissions, 'ppp');
		done();
	});

	it('datapoints-11 - Set permissions with JSON', (done) => {
		const newPerms = {
			GET: [],
			PUT: [],
			DELETE: []
		};
		const dp1 = new Datapoint();
		dp1.setPermissions(newPerms);
		should.equal(typeof dp1.permissions, 'object');
		should.equal(dp1.permissions.GET.length, 0);
		should.equal(dp1.permissions.PUT.length, 0);
		should.equal(dp1.permissions.DELETE.length, 0);
		done();
	});

	it('datapoints-12 - Add permissions', (done) => {
		const dp1 = new Datapoint();
		dp1.addPermission('GET', 'bruce');
		dp1.addPermission('PUT', 'clark');
		dp1.addPermission('DELETE', 'diana');
		should.equal(typeof dp1.permissions, 'object');
		should.equal(dp1.permissions.GET.length, 1);
		should.equal(dp1.permissions.PUT.length, 1);
		should.equal(dp1.permissions.DELETE.length, 1);
		done();
	});

	it('datapoints-13a - No permissions override with custom', (done) => {
		const dp1 = new Datapoint();
		dp1.addPermission('GET', 'asdf');
		should(() => { dp1.setCustomPermissions('uh oh'); }).throwError();
		done();
	});

	it('datapoints-13b - No permissions override with set', (done) => {
		const newPerms = {
			GET: [],
			PUT: [],
			DELETE: []
		};
		const dp1 = new Datapoint();
		dp1.setCustomPermissions('uh oh');
		should(() => { dp1.setPermission(newPerms); }).throwError();
		done();
	});

	it('datapoints-14 - Chain commands', (done) => {
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
		should.equal(dp1.format, 'string');
		should.equal(dp1.type, 'test-type');
		should.equal(dp1.content.value, 'hello');
		done();
	});

	it('datapoints-15 - Generate', (done) => {
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
		dp1.setCustomPermissions('lalala');
		dp1.setParent('mother');
		const dat = dp1.generate();
		should.equal(typeof dat, 'object');
		done();
	});

	it('datapoints-16a - Fail generate: missing type', (done) => {
		const dp1 = new Datapoint().setFormat('string').setContent({ value: 'hello' });
		dp1.setCustomPermissions('lalala');
		dp1.setParent('mother');
		should(() => { dp1.generate(); }).throwError();
		done();
	});

	it('datapoints-16b - Fail generate: missing format/value', (done) => {
		const dp1 = new Datapoint().setType('test-type');
		dp1.setCustomPermissions('lalala');
		dp1.setParent('mother');
		should(() => { dp1.generate(); }).throwError();
		done();
	});

	it('datapoints-16c - Fail generate: missing permissions', (done) => {
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
		dp1.setParent('mother');
		should(() => { dp1.generate(); }).throwError();
		done();
	});

	it('datapoints-16d - Fail generate: missing parent', (done) => {
		const dp1 = new Datapoint().setType('test-type').setFormat('string').setContent({ value: 'hello' });
		dp1.setCustomPermissions('lalala');		
		should(() => { dp1.generate(); }).throwError();
		done();
	});

	it('datapoints-15 - Stringify', (done) => {
		const dp1 = new Datapoint();
		dp1.setType('test-type').setFormat('string').setContent({ value: 'hello' });
		should.equal(typeof dp1.toString(), 'string');
		done();
	});
});
