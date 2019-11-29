# simple_test_task
Implementation of simple products API
## Issue description
Implement simple Product API based on Express framework:
  1.	Implement all CRUD operations, plus add possibility to get ALL products from the storage  **and ALL reviews for a single product**. 
  For simplicity you can use local json file as storage (product example is the following -
  { id:  1, name:  'T-Shirt', price:  99.99, options: [{ color:  'blue' }, { size:  'XL' } ] } . 
  2.	Add authentication to the service:
    a.	Add  /auth  route to your application.
    b.	Implement standard login and password authentication: 
    send request to /auth with login and password and check if they matches to user login and password (may be hardcoded somewhere in application for now).
    c.	If user exists, generate JWT token and return it in a response. 
    d.	If user does not exist or credentials do not match - send error response with the proper error code.
    e.	Develop JWT token verification for all Products endpoints/routes.
  3.	Cover you code by tests.
  4.	Create Swagger to describe your API.
## Description of implementation
 The problem statement was completely clear to me, with the exception of the **and ALL reviews for a single product** part.
 
 My understanding of this part of the task is as follows, when an authorized user requests a certain product(*GET /product/:id*), it  means that he "reviewing it", respectively, in the "table" reviews (reviews.json file) we add a record: 
 
 `
 {
 "productId": "some_product_id",
 "user": "some_user_login",
 "date": "date of reviewing"
 }
 `.
 
 When a product is deleted, all relevant reviews are deleted.
 
 In accordance with the task created endpoints
- *POST /auth* - authorization endpoint;
- *GET /products* - get list of product objects;
- *GET /products/:id* - get product object;
- *GET /products/:id/reviews* - get reviews for a product;
- *POST /products* - create product object;
- *PUT /products/:id* - update product object;
- *DELETE /product/:id* - delete product object.

All this endpoints awaliable in Swagger at */api-docs* route.

## Available Scripts
In the project directory, you can run:

### `npm install`

Install required packages.

### `npm start`

Runs the app in the development mode.

### `npm test`

Runs the tests.

