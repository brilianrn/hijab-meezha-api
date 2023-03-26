const route = require("express").Router();
const {
  FindAllProvinces,
  FindAllCities,
  FindAllDistricts,
  FindAllVillages,
  FindAllPostCodes,
} = require("../../controllers/users");
const { UserAuthentication } = require("../../middlewares/auth");

route.get("/provinces", UserAuthentication, FindAllProvinces);
route.get("/cities/:provinceId", UserAuthentication, FindAllCities);
route.get("/districts/:cityId", UserAuthentication, FindAllDistricts);
route.get("/villages/:districtId", UserAuthentication, FindAllVillages);
route.get(
  "/post-codes/:cityId/:districtId",
  UserAuthentication,
  FindAllPostCodes
);

module.exports = route;
