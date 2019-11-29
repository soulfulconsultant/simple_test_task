const jwt = require('./jwt');
const ProductsService = require('../services/ProductsService');
const ReviewService = require('../services/ReviewService');

const checkAuth = () => (req, res, next) => {
  const token = req.get('authorization');

  if (!token) {
    const error = new Error(`No token provided.`);
    error.status = 401;
    return next(error);
  }

  const result = jwt.decode(token);

  if (!result.allow) {
    const error = new Error(result.jwtError.message);
    error.status = 401;
    return next(error);
  }

  req.locals.user = result.user;

  next();
};

const withProducts = params => (req, res, next) => {
  req.locals.productsService = new ProductsService({ ...params, user: req.locals.user });
  next();
};

const withReviews = params => (req, res, next) => {
  req.locals.reviewsService = new ReviewService({ ...params, user: req.locals.user });
  next();
};

module.exports = { checkAuth, withProducts, withReviews };