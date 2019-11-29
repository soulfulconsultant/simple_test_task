const filter = require('lodash.filter');

const BaseService = require('./BaseService');
const reviewSchema = require('../schemas/review');

class ReviewsService extends BaseService {
  create(productId) {
    return super.create({
      productId,
      user: this.user,
      date: Date.now()
    });
  }
  async listByProduct(productId) {
    const reviews = await super.list();

    return filter(reviews, { productId });
  }
  async deleteByProduct(productId) {
    return this.batchDelete({ productId });
  }
  get tableName() {
    return 'reviews';
  }

  get schema() {
    return reviewSchema;
  }
}

module.exports = ReviewsService;