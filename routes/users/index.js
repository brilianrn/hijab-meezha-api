const express = require('express');
const route = express.Router();
const user = require('./user.route');
const common = require('./common.route');
const product = require('./product.route');
const cart = require('./cart.route');
const article = require('./article.route');
const address = require('./address.route');

route.use('/', user);
route.use('/common', common);
route.use('/product', product);
route.use('/cart', cart);
route.use('/article', article);
route.use('/address', address);

module.exports = route;
