const joi = require('joi');

module.exports = joi.object().keys({
  id: joi.string().guid().required(),
  productId: joi.string().guid().required(),
  date: joi.date().timestamp().required(),
  user: joi.string().required(),
});
