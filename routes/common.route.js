const route = require('express').Router();
const {
  ResendOtp,
  ConfirmOtp,
  CreateRole,
  FindAllRole,
  FindDetailRole,
  UpdateRole,
  DeleteRole,
} = require('../controllers/commons');
const { authentication } = require('../middlewares/authorization');

route.post('/otp/confirm', ConfirmOtp);
route.post('/otp/resend', ResendOtp);

// route.use(authentication);

route.get('/role', FindAllRole);
route.get('/role/:id', FindDetailRole);
route.patch('/role/:id', UpdateRole);
route.delete('/role/:id', DeleteRole);
route.post('/role/create', CreateRole);

module.exports = route;
