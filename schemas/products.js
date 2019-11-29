const joi = require('joi');

module.exports = joi.object().keys({
  id: joi.string().guid().required(),
  name: joi.string().required(),
  price: joi.number().required(),
  options: joi.array().items(joi.object()),
});
