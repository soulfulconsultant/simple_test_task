const fs = require('fs');

const path = require('path');
const util = require('util');
const find = require('lodash.find');
const findIndex = require('lodash.findindex');
const reject = require('lodash.reject');

const { NotFoundError } = require('./errors');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class StorageAdapter {
	constructor({ storagePath, tableName }) {
		this.filePath = path.join(storagePath, `${tableName}.json`);
		this.tableName = tableName;
	}

	async get(id) {
		const list = await this.list();

		const item = find(list, { id });

		if (!item) {
			throw new NotFoundError(id, this.tableName);
		}

		return item;
	}

	list() {
		return this._readFile();
	}

	async create(payload) {
		const list = await this.list();
		list.push(payload);
		await this._writeFile(list);

		return payload;
	}

	async update(payload) {
		const list = await this.list();
		const index = findIndex(list, { id: payload.id });

		if (index < 0) {
			throw new NotFoundError(payload.id, this.tableName);
		}

		list.splice(index, 1, payload);

		await this._writeFile(list);

		return payload;
	}

	async delete(id) {
		const list = await this.list();
		const index = findIndex(list, { id });

		if (index < 0) {
			throw new NotFoundError(id, this.tableName);
		}

		list.splice(index, 1);

		await this._writeFile(list);
	}

	async batchDelete(query) {
		const list = await this.list();

		const newList = reject(list, query);

		await this._writeFile(newList);
	}

	async _readFile() {
		const data = await readFile(this.filePath, 'utf8');
		return JSON.parse(data);
	}

	async _writeFile(data) {
		return writeFile(this.filePath, JSON.stringify(data));
	}
}

module.exports = StorageAdapter;
