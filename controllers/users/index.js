const { CustomerLogin } = require("./login");
const { CustomerRegister } = require("./register");
const { ResetPassword } = require("./reset-password");
const { UserInfo } = require("./user-info");
const { FogotUseEmail } = require("./forgot-password");
const { Add, Update, Delete, FindOne, FindAll } = require("./address");
const {
  FindAllProvinces,
  FindAllCities,
  FindAllDistricts,
  FindAllPostCodes,
  FindAllVillages,
} = require("./regions");

module.exports = {
  CustomerLogin,
  CustomerRegister,
  FogotUseEmail,
  UserInfo,
  ResetPassword,
  CreateAddress: Add,
  UpdateAddress: Update,
  DeleteAddress: Delete,
  FindOneAddress: FindOne,
  FindAllAddress: FindAll,
  FindAllProvinces,
  FindAllCities,
  FindAllDistricts,
  FindAllPostCodes,
  FindAllVillages,
};
