const route = require('express').Router();
const { ResendOtp, ConfirmOtp } = require('../../controllers/commons');

route.post('/otp/confirm', ConfirmOtp);
route.post('/otp/resend', ResendOtp);

module.exports = route;
