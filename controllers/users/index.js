const { CustomerLogin } = require('./login');
const { CustomerRegister } = require('./register');
const { ResetPassword } = require('./reset-password');
const { UserInfo } = require('./user-info');
const { FogotUseEmail } = require('./forgot-password');

module.exports = {
  CustomerLogin,
  CustomerRegister,
  FogotUseEmail,
  UserInfo,
  ResetPassword,
};
