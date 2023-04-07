const { errors, successMessageTypes } = require("../../../constants");
const { Category } = require("../../../models");
const { UploadImage } = require("../../../services/imgur.service");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const UpdateCategory = async (req, res, next) => {
  const { name, description, photo, isActive } = req.body;
  const { id } = req.params;
  const active = isActive === "true";
  let tempImage = null;

  if (!name)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Category name",
    });

  try {
    if (req.files[0]) {
      tempImage = await UploadImage(req.files[0]);
    }

    const opt = { where: { id } };
    const payload = {
      name,
      description,
      photo: tempImage || photo,
      isActive: active,
      updatedBy: req.currentAdmin.id,
    };
    const updateCategory = await Category.update(payload, opt);
    if (!updateCategory) return next(updateCategory);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Product category"),
          { name, description, photo: tempImage || photo }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateCategory };
