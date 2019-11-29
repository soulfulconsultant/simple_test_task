const BaseService = require('./BaseService');
const ReviewsService = require('./ReviewService');
const productSchema = require('../schemas/products');

class ProductsService extends BaseService {
	constructor(params) {
		super(params);

		this.reviewsService = new ReviewsService(params);
	}

	async get(id) {
		const product = await super.get(id);

		await this.reviewsService.create(product.id);

		return product;
	}

	async getReviews(productId) {
		await super.get(productId);

		return this.reviewsService.listByProduct(productId);
	}

	async delete(id) {
		await super.delete(id);
		await this.reviewsService.deleteByProduct(id);
	}

	get tableName() {
		return 'products';
	}

	get schema() {
		return productSchema;
	}
}

module.exports = ProductsService;
