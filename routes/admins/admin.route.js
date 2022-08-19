const route = require('express').Router();
const { AdminRegister, AdminLogin } = require('../../controllers/admins');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');

route.post('/login', AdminLogin);

route.use(AdminAuthentication);
route.use(AdminAuthorization('Super Admin'));

route.post('/register', AdminRegister);

module.exports = route;
