const express = require('express');
const route = express.Router();
const product = require('./product.route');
const admin = require('./admin.route');
const common = require('./common.route');

route.use('/', admin);
route.use('/product', product);
route.use('/common', common);

module.exports = route;
