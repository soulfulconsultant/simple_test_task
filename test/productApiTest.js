const server = require('../main');
const request = require("supertest")(server);
const chai = require('chai');
const jwt = require('../lib/jwt');

const DEFAULT_USER_DATA = {
  login: 'test',
  password: '12345'
};
const wrongLogin = 'test1';
const wrongPassword = 'test';

const CREATE_TEST_PRODUCT_DATA = {
  name: "Test product 1",
  price: 100,
  options: [
    {
      color: "blue"
    },
    {
      size: "XL"
    }
  ],
};

const getUpdateTestProductData = (id) => ({
  ...CREATE_TEST_PRODUCT_DATA,
  name: 'UPDATED PRODUCT 1',
  id
});


let token;
let productId;

const loginUser = async = (login, password) => request.post('/auth')
  .send({
    login: login,
    password: password,
  });

describe('Authorization endpoints', () => {

  it('should fail authorization because user does not exist', async () => {
    const res = await loginUser(wrongLogin, DEFAULT_USER_DATA.password);
    chai.expect(res.status).equal(400);
    chai.expect(res.error.text).equal(`A user with login ${wrongLogin} does not exist.`);
  });

  it('should fail authorization because password is wrong', async () => {
    const res = await loginUser(DEFAULT_USER_DATA.login, wrongPassword);
    chai.expect(res.status).equal(400);
    chai.expect(res.error.text).equal(`Wrong password.`);
  });

  it('should successfully retrieve the token', async () => {
    const res = await loginUser(DEFAULT_USER_DATA.login, DEFAULT_USER_DATA.password);
    token = res.body.token;

    chai.expect(res.status).equal(200);
    chai.expect(token).be.a('string');
  });
});

describe('Products endpoints', () => {

  it('should successfully get products list', async () => {
    const res = await request.get('/products')
      .set({ 'Authorization': token });

    chai.expect(res.status).equal(200);
    chai.expect(res.body).be.a('array');
  });

  it('should successfully create product', async () => {
    const res = await request.post('/products')
      .send(CREATE_TEST_PRODUCT_DATA)
      .set({ 'Authorization': token });
    const product = res.body;
    productId = product.id;

    chai.expect(res.status).equal(200);
    chai.expect(product.id).be.a('string');
    chai.expect(product.name).be.a('string');
    chai.expect(product.price).be.a('number');
    chai.expect(product.options).be.a('array');
  });

  it('should successfully update product', async () => {
    const updateProductData = getUpdateTestProductData(productId);
    const res = await request.put(`/products/${productId}`)
      .send(updateProductData)
      .set({ 'Authorization': token });

    const product = res.body;
    productId = product.id;
    chai.expect(res.status).equal(200);
    chai.expect(product.name).equal(updateProductData.name);
  });

  it('should successfully get single product', async () => {
    const res = await request.get(`/products/${productId}`)
      .set({ 'Authorization': token });
    const product = res.body;

    chai.expect(res.status).equal(200);
    chai.expect(product.id).be.a('string');
    chai.expect(product.name).be.a('string');
    chai.expect(product.price).be.a('number');
    chai.expect(product.options).be.a('array');
  });

  it('should successfully get product reviews', async () => {
    const res = await request.get(`/products/${productId}/reviews`)
      .set({ 'Authorization': token });

    chai.expect(res.status).equal(200);
    chai.expect(res.body).be.a('array');
  });

  it('should successfully delete product', async () => {
    const res = await request.delete(`/products/${productId}`)
      .set({ 'Authorization': token });

    chai.expect(res.status).equal(200);
  });
});

