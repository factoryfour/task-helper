/* eslint
valid-typeof: 'off',
vars-on-top: 'off',
no-var: off
*/

const Datapoint = require('./datapoint');

function checkDatapointType(input) {
	return input instanceof Datapoint || input instanceof Object;
}

function checkType(input) {
	return input instanceof Datapoint || input instanceof Object;
}

class TaskOutput {
	constructor() {
		// Initialize empty arrays for values
		this.datapoints = [];
		this.notifications = [];
		this.assignments = [];
	}

	// Setters ====================================

	// Add a datapoint
	addDatapoint(dpt) {
		if (checkDatapointType(dpt)) this.datapoints.push(dpt);
		else throw Error('Input must be JSON or Datapoint object.');
		return this;
	}

	// Add a datapoint
	addNotification(notif) {
		if (checkType(notif)) this.notifications.push(notif);
		else throw Error('Input must be JSON object.');
		return this;
	}

	// Add a datapoint
	addAssignment(assn) {
		if (checkType(assn)) this.assignments.push(assn);
		else throw Error('Input must be JSON object.');
		return this;
	}

	generate() {
		const output = {
			datapoints: [],
			notifications: this.notifications,
			assignments: this.assignments
		};
		// Reformat datapoints if stored as an object
		this.datapoints.forEach((dpt) => {
			output.datapoints.push(dpt instanceof Datapoint ? dpt.generate() : dpt);
		});
		return output;
	}

	// Convert task output to string
	toString() {
		return JSON.stringify(this.generate());
	}

}

module.exports = TaskOutput;
