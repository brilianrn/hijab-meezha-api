const { successMessageTypes, errors } = require("../../../constants");
const { Address } = require("../../../models");
const {
  rajaOngkirShippingPrices,
} = require("../../../services/rajaongkir.service");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const ShippingPrices = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const { courier, weight } = req.body;
    const opt = {
      where: { userId: id, isMainAddress: true },
      attributes: ["id", "shippingDestinationId"],
    };
    const address = await Address.findOne(opt);
    if (!address) {
      throw new Error();
    }
    const { data, error } = await rajaOngkirShippingPrices({
      destination: address.shippingDestinationId,
      courier,
      weight,
    });
    if (!data && error) {
      return next({
        name: errors["404"],
        description: "Shipping Price",
      });
    }
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, "Shipping Price"),
          data
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { ShippingPrices };
