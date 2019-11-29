class NotFoundError extends Error {
	constructor(id, tableName) {
		super(`Not found item with id ${id} in table ${tableName}`);
	}
}

class ValidationError extends Error {
	constructor(error, tableName) {
		super(`Validation failed for ${tableName}: ${error}.`);
	}
}

module.exports = { NotFoundError, ValidationError };