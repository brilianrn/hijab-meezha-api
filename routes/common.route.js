const route = require('express').Router();
const { ConfirmOtp } = require('../controllers/commons/confirm-otp');
const { authentication } = require('../middlewares/authorization');

route.post('/confirm-otp', ConfirmOtp);

// route.use(authentication);

module.exports = route;
