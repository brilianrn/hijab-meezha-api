const express = require('express');
const route = express.Router();
const product = require('./product.route');
const admin = require('./admin.route');
const common = require('./common.route');
const article = require('./article.route');

route.use('/', admin);
route.use('/product', product);
route.use('/common', common);
route.use('/article', article);

module.exports = route;
