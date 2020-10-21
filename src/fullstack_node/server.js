require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productHandler = require('./product_handler');
const orderHandler = require('./order_handler');
const middleware = require('./middleware');
const port = process.env.PORT || 1337;
const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());

app.get('/products', productHandler.listProducts);
app.get('/products/:id', productHandler.getProduct);
app.post('/products', productHandler.createProduct);
app.put('/products/:id', productHandler.editProduct);
app.delete('/products/:id', productHandler.deleteProduct);

app.get('/orders', orderHandler.listOrders);
app.get('/orders/:id', orderHandler.getOrder);
app.post('/orders', orderHandler.createOrder);
app.delete('/orders/:id', orderHandler.deleteOrder);

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => {
	console.log(`Fullstack example app listening at http://localhost:${port}`);
});
