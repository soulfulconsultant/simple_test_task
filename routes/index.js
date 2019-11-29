const express = require('express');

const router = express.Router();
const authRoute = require('./auth');
const productsRoute = require('./products');
const reviewsRoute = require('./reviews');
const { checkAuth, withProducts, withReviews } = require('../lib/middlewares');

module.exports = (param) => {
	router.get('/', async (req, res, next) => {
		try {
			return res.redirect('/api-docs');
		} catch (err) {
			return next(err);
		}
	});

	router.use('/auth', authRoute(param));
	router.use('/products', checkAuth(), withProducts(param), productsRoute(param));
	router.use('/reviews', checkAuth(), withReviews(param), reviewsRoute(param));

	return router;
};
