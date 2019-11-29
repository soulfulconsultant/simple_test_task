# simple_test_task
Implementation of simple products API
## Issue description
Implement simple Product API based on Express framework:
  1.	Implement all CRUD operations, plus add possibility to get ALL products from the storage  and ALL reviews for a single product. 
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

  ## Installing and running
  Use `npm install` command to install required packages and `npm start` to run server
