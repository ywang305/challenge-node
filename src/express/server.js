const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./route_handler');
const middleware = require('./middleware');
const port = process.env.PORT || 1337;
const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.get('/products', handler.listProducts);
app.get('/products/:id', handler.getProduct);
app.use(middleware.handleError);
app.use(middleware.notFound);
