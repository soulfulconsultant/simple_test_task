const express = require('express');

const ReviewsService = require('../services/ReviewService');
const jwt = require('../lib/jwt');
const router = express.Router();

const TEST_USER_LOGIN = 'test';
const TEST_USER_PASSWORD = '12345';

module.exports = (param) => {
  router.post('/', async (req, res, next) => {
    if (req.body.login !== TEST_USER_LOGIN) {

      const error = new Error(`A user with login ${req.body.login} does not exist.`);
      error.status = 400;

      return next(error);
    }
    if (req.body.password !== TEST_USER_PASSWORD) {
      const error = new Error(`Wrong password.`);
      error.status = 400;

      return next(error);
    }

    const token = jwt.encode({ user: req.body.login });

    res.send({ token });
  });

  return router;
};