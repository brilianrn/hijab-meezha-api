const express = require('express');
const route = express.Router();
const product = require('./product.route');
const admin = require('./admin.route');

route.use('/', admin);
route.use('/product', product);

module.exports = route;
