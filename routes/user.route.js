const route = require('express').Router();
const {
  CustomerRegister,
  CustomerLogin,
  UserInfo,
  FogotUseEmail,
} = require('../controllers/users');
const { authentication } = require('../middlewares/authorization');

route.post('/register', CustomerRegister);
route.post('/login', CustomerLogin);
route.post('/forgot-password-use-email', FogotUseEmail);

route.get('/info', authentication, UserInfo);

module.exports = route;
