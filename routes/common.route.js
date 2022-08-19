const route = require('express').Router();
const {
  ResendOtp,
  ConfirmOtp,
  CreateRole,
  FindAllRole,
  FindDetailRole,
  UpdateRole,
  DeleteRole,
  FindAllForDropDown,
} = require('../controllers/commons');

route.post('/otp/confirm', ConfirmOtp);
route.post('/otp/resend', ResendOtp);

// route.use(authentication);

route.get('/role', FindAllRole);
route.get('/role/dropdown', FindAllForDropDown);
route.get('/role/:id', FindDetailRole);
route.patch('/role/:id', UpdateRole);
route.delete('/role/:id', DeleteRole);
route.post('/role/create', CreateRole);

module.exports = route;
