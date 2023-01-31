const route = require('express').Router();
const {
  AdminRegister,
  AdminLogin,
  AdminInfo,
} = require('../../controllers/admins');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');

route.post('/login', AdminLogin);

route.use(AdminAuthentication);

route.get('/info', AdminInfo);

route.use(AdminAuthorization('Super Admin'));

route.post('/register', AdminRegister);

module.exports = route;
