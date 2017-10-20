/* eslint
valid-typeof: 'off'
*/

function checkPermissionsOverride(dpt, override) {
	const ovr = override || false;
	if (dpt.body.permissions && !ovr) {
		return false;
	}
	return true;
}

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
			value: null,
			title: null
		};
		this.body.parent = null;
		this.body.permissions = null;
		// Add type (if provided)
		if (type) this.setType(type);
		// Add format (if provided)
		if (format) this.setFormat(format);
	}

	// Getters ====================================

	/**
	 * The data stored in a Datapoint.
	 */
	get data() {
		return this.body;
	}

	/**
	 * The data type for the Datapoint's value.
	 */
	get format() {
		return this.body.format;
	}

	/**
	 * The type of Datapoint.
	 */
	get type() {
		return this.body.type;
	}

	/**
	 * The content of the Datapoint.
	 */
	get content() {
		return this.body.content;
	}

	/**
	 * The parent of this Datapoint.
	 */
	get parent() {
		return this.body.parent;
	}

	/**
	 * Permissions associated with this Datapoint.
	 */
	get permissions() {
		return this.body.permissions;
	}

	// Setters ====================================

	/**
	 * Set the type of the Datapoint.
	 * @param {string} type must be a valid string.
	 */
	setType(type) {
		if (typeof type === 'string') {
			this.body.type = type;
			return this;
		}
		const typeErr = 'Type must be a valid string';
		throw Error(typeErr);
	}

	/**
	 * 
	 * @param {*} format 
	 */
	setFormat(format) {
		if (typeof format === 'string') {
			this.body.format = format;
			return this;
		}
		const typeErr = 'Type must be a valid string representing a type (string, number)';
		throw Error(typeErr);
	}

	// Set the value
	setContent(content) {
		// Make sure we have an object with a value field
		let contentObj = {};
		if (typeof content == 'object') {
			if (!content.value) {
				const fmtError = 'Must provide object with value';
				throw TypeError(fmtError);
			}
			contentObj = Object.assign(contentObj, content);
		} else {
			contentObj.value = content;
		}
		// Check format
		if (!this.body.format) {
			const fmtError = 'Datapoint does not have a format specified.';
			throw Error(fmtError);
		} else if (typeof contentObj.value != this.body.format) {
			const fmtError = `Value type must match format: ${this.body.format}`;
			throw TypeError(fmtError);
		}
		// Assign to datapoint
		this.body.content = Object.assign(this.body.content, contentObj);
		return this;
	}

	// Set the parent
	setParent(parent) {
		this.body.parent = parent;
		return this;
	}

	// Set custom permissions
	setCustomPermissions(perms, override) {
		if (!checkPermissionsOverride(this, override)) throw Error('This datapoint already has permissions. Override option not specified.');
		this.body.permissions = perms;
		return this;
	}

	// Set permissions with object
	setPermissions(perms, override) {
		if (!checkPermissionsOverride(this, override)) throw Error('This datapoint already has permissions. Override option not specified.');
		if ((typeof perms != 'object') && (!perms.GET && !perms.PUT && !perms.DELETE)) {
			throw Error('Permissions have GET, PUT, and DELETE fields.');
		}
		// Add the permission
		if (this.body.permissions && typeof this.body.permissions == 'object') {
			console.log(this.body.permissions);
			this.body.permissions = Object.assign(this.body.permissions, perms);
		} else {
			this.body.permissions = perms;
		}
		return this;
	}

	// Add a permission
	addPermission(type, perm) {
		if (['GET', 'PUT', 'DELETE'].indexOf(type) < 0) {
			throw Error('Permission must be of type GET, PUT, or DELETE. Otherwise, use setCustomPermissions');
		}
		// If body doesnt have a permissions object, initialize it
		if (!this.body.permissions || typeof this.body.permissions != 'object') {
			this.body.permissions = {
				GET: [],
				PUT: [],
				DELETE: []
			};
		}
		this.body.permissions[type].push(perm);
		return this;
	}

	// Check that all fields have been set, and if so, return JSON of data
	generate() {
		const myBody = this.body;
		['type', 'format', 'content', 'parent'].forEach((fieldName) => {
			if (!myBody[fieldName]) {
				throw Error(`Missing a field: ${fieldName}`);
			}
		});
		return this.body;
	}

	// Convert datapoint to string
	toString() {
		return JSON.stringify(this.data);
	}

}

module.exports = Datapoint;
