const express = require('express');
const route = express.Router();
const user = require('./user.route');
const common = require('./common.route');
const product = require('./product.route');

route.use('/', user);
route.use('/common', common);
route.use('/product', product);

module.exports = route;
