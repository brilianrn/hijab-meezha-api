const UserController = require('../controllers/user.controller');
const route = require('express').Router();

route.post('/register', UserController.register);
route.post('/login', UserController.login);

module.exports = route;
