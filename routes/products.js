const express = require('express');
const router = express.Router();

module.exports = (param) => {

  router.get('/', async (req, res, next) => {
    try {
      const products = await req.locals.productsService.list();

      return res.json(products);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const products = await req.locals.productsService.get(req.params.id);

      return res.json(products);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id/reviews', async (req, res, next) => {
    try {
      const reviews = await req.locals.productsService.getReviews(req.params.id);

      return res.json(reviews);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const product = await req.locals.productsService.create(req.body);

      return res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const product = await req.locals.productsService.update({
        ...req.body,
        id: req.params.id
      });

      return res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const product = await req.locals.productsService.delete(req.params.id);

      return res.json(product);
    } catch (err) {
      next(err);
    }
  });

  return router;
};