const { ConfirmOtp } = require("./otp/confirm-otp");
const { ResendOtp } = require("./otp/resend-otp");

const { FindAllRole, FindAllForDropDown } = require("./role/find-all");
const { FindDetailRole } = require("./role/find-detail");
const { UpdateRole } = require("./role/update");
const { DeleteRole } = require("./role/delete");
const { CreateRole } = require("./role/create");

const { CreateStatus } = require("./status/create");
const { DeleteStatus } = require("./status/delete");
const { FindAllStatus, FindStatusLOV } = require("./status/find-all");
const { FindDetailStatus } = require("./status/find-detail");
const { UpdateStatus } = require("./status/update");

const { ShippingPrices } = require("./shipping");

module.exports = {
  ConfirmOtp,
  ResendOtp,
  CreateRole,
  UpdateRole,
  DeleteRole,
  FindAllRole,
  FindAllForDropDown,
  FindDetailRole,
  CreateStatus,
  DeleteStatus,
  FindAllStatus,
  FindDetailStatus,
  UpdateStatus,
  FindStatusLOV,
  ShippingPrices,
};
