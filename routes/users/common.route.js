const route = require("express").Router();
const {
  ResendOtp,
  ConfirmOtp,
  ShippingPrices,
  FindStatusLOV,
} = require("../../controllers/commons");
const { UserAuthentication } = require("../../middlewares/auth");
const { shippingPricesTerm } = require("../../middlewares/commons/shipping");
const { paramTypeStatusChecking } = require("../../middlewares/commons/status");

route.post("/otp/confirm", ConfirmOtp);
route.post("/otp/resend", ResendOtp);

route.use(UserAuthentication);
route.post("/shipping/price", shippingPricesTerm, ShippingPrices);

route.get("/status/lov/:type", paramTypeStatusChecking, FindStatusLOV);

module.exports = route;
