const express = require('express');
const router = express.Router();

module.exports = (param) => {
  router.get('/', async (req, res, next) => {
    try {
      const reviews = await req.locals.reviewsService.list();

      return res.json(reviews);
    } catch (err) {
      next(err);
    }
  });

  return router;
};