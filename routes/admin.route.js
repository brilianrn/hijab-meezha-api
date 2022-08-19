const route = require('express').Router();
const { AdminRegister, AdminLogin } = require('../controllers/admins');

// route.use(authentication);

route.post('/register', AdminRegister);
route.post('/login', AdminLogin);

module.exports = route;
