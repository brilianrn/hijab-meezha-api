const route = require('express').Router();
const {
  CustomerRegister,
  CustomerLogin,
  UserInfo,
  FogotUseEmail,
  ResetPassword,
} = require('../controllers/users');
const { UserAuthentication } = require('../middlewares/auth');

route.post('/register', CustomerRegister);
route.post('/login', CustomerLogin);
route.post('/reset-password/:access_token', ResetPassword);
route.post('/forgot-password-use-email', FogotUseEmail);

route.get('/info', UserAuthentication, UserInfo);

module.exports = route;
