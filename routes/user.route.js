const route = require('express').Router();
const {
  CustomerRegister,
  CustomerLogin,
  UserInfo,
} = require('../controllers/users');
const { authentication } = require('../middlewares/authorization');

route.post('/register', CustomerRegister);
route.post('/login', CustomerLogin);

route.use(authentication);

route.get('/info', UserInfo);

module.exports = route;
