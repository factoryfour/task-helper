/* eslint
valid-typeof: 'off',
vars-on-top: 'off',
no-var: off
*/

/**
 * @ignore
 * Import the Datapoint class.
 */
const Datapoint = require('./datapoint');

/**
 * @ignore
 * Check if an object is a Datapoint or JSON object.
 * @param {*} input - object to validate.
 */
function checkDatapointType(input) {
	return input instanceof Datapoint || input instanceof Object;
}

/**
 * @ignore
 * Check if an object is a JSON object.
 * @param {*} input - object to validate.
 */
function checkType(input) {
	return input instanceof Object;
}

/**
 * TaskOutput collects datapoints, notifications, and assignments into one object.
 */
class TaskOutput {
	/**
	 * TaskOutput collects datapoints, notifications, and assignments into one object.
	 */
	constructor() {
		/**
		 * Store Datapoints in an array.
		 */
		this.datapoints = [];
		/**
		 * Store Notifications in an array.
		 */
		this.notifications = [];
		/**
		 * Store assignments in an array.
		 */
		this.assignments = [];
	}

	// Setters ====================================

	/**
	 * Add a datapoint
	 * @param {*} dpt - Datapoint instance or JSON object.
	 * @returns {TaskOutput} this TaskOutput object.
	 */
	addDatapoint(dpt) {
		if (checkDatapointType(dpt)) this.datapoints.push(dpt);
		else throw Error('Input must be JSON or Datapoint object.');
		return this;
	}

	/**
	 * Add a notification to the task output.
	 * @param {object} notif - Notification JSON object.
	 * @returns {TaskOutput} this TaskOutput object.
	 */
	addNotification(notif) {
		if (checkType(notif)) this.notifications.push(notif);
		else throw Error('Input must be JSON object.');
		return this;
	}

	/**
	 * Add an assignment to the task output.
	 * @param {object} assn - Assignment JSON object.
	 * @returns {TaskOutput} this TaskOutput object.
	 */
	addAssignment(assn) {
		if (checkType(assn)) this.assignments.push(assn);
		else throw Error('Input must be JSON object.');
		return this;
	}

	/**
	 * Generate an object collecting datapoints, notifications, and assignments.
	 * For any datapoints, validate it's fields and generate a JSON.
	 * @returns {object} this TaskOutput object's data.
	 */
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

	/**
	 * Convert the task output to a string.
	 * @returns {string} string representation of this TaskOutput object's data.
	 */
	toString() {
		return JSON.stringify(this.generate());
	}

}

module.exports = TaskOutput;
