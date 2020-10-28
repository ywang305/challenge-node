require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productHandler = require('./model/product_handler');
const orderHandler = require('./model/order_handler');
const userHandler = require('./model/user_handler');
const middleware = require('./middleware');
const auth = require('./auth_jwt'); //require('./auth_cookie');

const port = process.env.PORT || 1337;
const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
//auth.setMiddleware(app);

app.post('/login', auth.authenticate, auth.login);

app.get('/products', productHandler.listProducts);
app.get('/products/:id', productHandler.getProduct);
app.post('/products', auth.ensureUser, productHandler.createProduct);
app.put('/products/:id', auth.ensureUser, productHandler.editProduct);
app.delete('/products/:id', auth.ensureUser, productHandler.deleteProduct);

app.get('/orders', auth.ensureUser, orderHandler.listOrders);
app.get('/orders/:id', orderHandler.getOrder);
app.post('/orders', auth.ensureUser, orderHandler.createOrder);
app.delete('/orders/:id', orderHandler.deleteOrder);

app.get('/users', userHandler.listUsers);
app.get('/users/:username', userHandler.getUser);
app.post('/users', userHandler.createUser);
app.put('/users/:username', userHandler.editUser);
app.delete('/users/:username', userHandler.deleteUser);

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => {
	console.log(`Fullstack example app listening at http://localhost:${port}`);
});
