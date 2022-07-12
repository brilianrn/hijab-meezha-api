const UserController = require('../controllers/user.controller');
const { authentication } = require('../middlewares/authorization');
const route = require('express').Router();

route.post('/register', UserController.register);
route.post('/login', UserController.login);

route.use(authentication);

route.get('/info', UserController.userInfo);

module.exports = route;
