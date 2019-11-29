const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Simple products API',
      description: 'Products API information',
      contact: {
        name: 'Oleksandr Burlaka',
        email: 'Oleksandr_Burlaka@epam.com',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: [
    './docs/auth.yaml',
    './docs/getProducts.yaml',
    './docs/getProduct.yaml',
    './docs/getProductReviews.yaml',
    './docs/postProduct.yaml',
    './docs/putProduct.yaml',
    './docs/deleteProduct.yaml',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;