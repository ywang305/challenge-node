require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productHandler = require('./model/product_handler');
const orderHandler = require('./model/order_handler');
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
app.post('/products', auth.ensureAdmin, productHandler.createProduct);
app.put('/products/:id', auth.ensureAdmin, productHandler.editProduct);
app.delete('/products/:id', auth.ensureAdmin, productHandler.deleteProduct);

app.get('/orders', auth.ensureAdmin, orderHandler.listOrders);
app.get('/orders/:id', orderHandler.getOrder);
app.post('/orders', auth.ensureAdmin, orderHandler.createOrder);
app.delete('/orders/:id', auth.ensureAdmin, orderHandler.deleteOrder);

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => {
	console.log(`Fullstack example app listening at http://localhost:${port}`);
});
