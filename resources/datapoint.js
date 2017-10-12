/* eslint
valid-typeof: 'off'
*/

class Datapoint {
	constructor(type, format) {
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
		// Add type (if provided)
		if (type) this.setType(type);
		// Add format (if provided)
		if (format) this.setFormat(format);
	}

	// Getters ====================================

	// Datapoint body
	get data() {
		return this.body;
	}

	// Format of the value (string, number)
	get format() {
		return this.body.format;
	}

	// Datapoint type
	get type() {
		return this.body.type;
	}

	// Content JSON
	get content() {
		return this.body.content;
	}

	// Setters ====================================

	// Set the type
	setType(type) {
		if (typeof type === 'string') {
			this.body.type = type;
			return this;
		}
		const typeErr = 'Type must be a valid string';
		throw Error(typeErr);
	}

	// Set the format
	setFormat(format) {
		if (typeof format === 'string') {
			this.body.format = format;
			return this;
		}
		const typeErr = 'Type must be a valid string representing a type (string, number)';
		throw Error(typeErr);
	}

	// Set the value
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

	// Convert datapoint to string
	toString() {
		return JSON.stringify(this.body);
	}

}

module.exports = Datapoint;
