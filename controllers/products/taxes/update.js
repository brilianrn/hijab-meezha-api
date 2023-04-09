const { errors, successMessageTypes } = require("../../../constants");
const { Tax } = require("../../../models");
const { NumberCheck } = require("../../../utils/check-fields");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const UpdateProductTax = async (req, res, next) => {
  const { name, amount, isActive } = req.body;
  const { id } = req.params;

  if (!name)
    return next({ name: errors["400_EMPTY_FIELD"], description: "Tax name" });
  if (!amount)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Amount",
    });
  if (!NumberCheck(amount))
    return next({
      name: errors["400_WRONG_DATA_TYPE"],
      description: "Amount",
    });

  try {
    const opt = { where: { id } };
    const payload = { name, amount, isActive, updatedBy: req.currentAdmin.id };
    const updateTax = await Tax.update(payload, opt);
    if (!updateTax) return next(updateTax);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Product tax"),
          { name, amount }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateProductTax };
