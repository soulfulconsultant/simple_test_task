const express = require('express');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./docs/swaggerConfig');
const { NotFoundError, ValidationError } = require('./lib/errors');


const server = express();
const PORT = 3000;

server.use(express.json());
server.use((req, res, next) => {
  req.locals = {};
  next();
});

server.use('/', routes({ storagePath: `${__dirname}/storage` }));

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    err.status = 404;
  }
  if (err instanceof ValidationError) {
    err.status = 400;
  }
  res.status(err.status || 500);
  res.set('content-type', 'text/plain');

  return res.send(err.message);
});

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});

module.exports = server;