const UserC = require('./user.controller.ts');
const route = require('express').Router();

route.post('/register', UserC);

module.exports = route;
