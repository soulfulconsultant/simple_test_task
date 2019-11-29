const joi = require('joi');
const uuid = require('uuid');

const StorageAdapter = require('../lib/storageAdapter');
const { ValidationError } = require('../lib/errors');

class BaseService {
	constructor(params) {
		this.user = params.user;
		this.storageAdapter = new StorageAdapter({
			storagePath: params.storagePath,
			tableName: this.tableName
		});
	}

	get(id) {
		return this.storageAdapter.get(id);
	}

	list(params) {
		return this.storageAdapter.list(params);
	}

	create(payload) {
		return this.storageAdapter.create(
			this._validateSchema({
				...payload,
				id: this._getId()
			})
		);
	}

	update(payload) {
		return this.storageAdapter.update(this._validateSchema(payload));
	}

	delete(id) {
		return this.storageAdapter.delete(id);
	}

	batchDelete(query) {
		return this.storageAdapter.batchDelete(query);
	}

	_validateSchema(payload) {
		const res = joi.validate(payload, this.schema);

		if (res.error) {
			throw new ValidationError(res.error, this.tableName);
		}

		return res.value;
	}

	_getId() {
		return uuid.v4();
	}
}

module.exports = BaseService;
