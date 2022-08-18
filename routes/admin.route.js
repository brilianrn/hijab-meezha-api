const route = require('express').Router();
const { AdminRegister, AdminLogin } = require('../controllers/admins');
const { authentication } = require('../middlewares/authorization');

// route.use(authentication);

route.post('/register', AdminRegister);
route.post('/login', AdminLogin);

module.exports = route;
