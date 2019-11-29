const jwt = require('jsonwebtoken');

const secret = 'somesecret';

const encode = (data, exp = 60 * 60) => {
  return jwt.sign({ ...data, exp: Math.floor(Date.now() / 1000) + exp }, secret, { algorithm: 'HS256' });
};

const decode = (jwtToken) => {
  try {
    const data = jwt.verify(jwtToken, secret, { algorithm: 'HS256' });

    return {
      ...data,
      allow: true
    };
  } catch (error) {
    return {
      jwtError: error,
      allow: false
    };
  }
};

module.exports = { encode, decode };