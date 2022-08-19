const express = require('express');
const route = express.Router();
const user = require('./user.route');
const common = require('./common.route');

route.use('/', user);
route.use('/common', common);

module.exports = route;
