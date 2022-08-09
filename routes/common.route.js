const route = require('express').Router();
const { ResendOtp, ConfirmOtp } = require('../controllers/commons');
const { authentication } = require('../middlewares/authorization');

route.post('/confirm-otp', ConfirmOtp);
route.post('/resend-otp', ResendOtp);

// route.use(authentication);

module.exports = route;
