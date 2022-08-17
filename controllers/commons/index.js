const { ConfirmOtp } = require('./otp/confirm-otp');
const { ResendOtp } = require('./otp/resend-otp');

const { FindAllRole } = require('./role/find-all');
const { FindDetailRole } = require('./role/find-detail');
const { UpdateRole } = require('./role/update');
const { DeleteRole } = require('./role/delete');
const { CreateRole } = require('./role/create');

module.exports = {
  ConfirmOtp,
  ResendOtp,
  CreateRole,
  UpdateRole,
  DeleteRole,
  FindAllRole,
  FindDetailRole,
};
