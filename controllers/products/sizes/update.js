const { errors, successMessageTypes } = require("../../../constants");
const { Size, Category } = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");
const { UuidCheck } = require("../../../utils/check-fields");

const UpdateProductSize = async (req, res, next) => {
  const { name, categoryId, isActive } = req.body;
  const { id } = req.params;

  if (!name)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Size name",
    });
  if (!categoryId)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Category ID",
    });
  if (!UuidCheck(categoryId))
    return next({
      name: errors["400_WRONG_DATA_TYPE"],
      description: "Category ID",
    });

  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return next({
        name: errors["400_NOT_EXIST"],
        description: "Category ID",
      });
    }

    const checkSize = await Size.findOne({ where: { id } });
    if (!checkSize) {
      return next({
        name: errors["404"],
        description: "Size",
      });
    }
    const opt = { where: { id } };
    const payload = {
      name,
      categoryId,
      isActive,
      updatedBy: req.currentAdmin.id,
    };
    const updateSize = await Size.update(payload, opt);
    if (!updateSize) return next(updateSize);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Product size"),
          { name, categoryId }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateProductSize };
