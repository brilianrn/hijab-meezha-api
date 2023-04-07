const { errors, successMessageTypes } = require("../../../constants");
const { Category } = require("../../../models");
const { UploadImage } = require("../../../services/imgur.service");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const CreateProductCategory = async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Category name",
    });

  try {
    const url = await UploadImage(req.files[0]);
    const category = await Category.create({
      name,
      description,
      photo: url,
      createdBy: id,
      updatedBy: id,
    });
    if (!category) return next(category);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, "Category"),
          category
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateProductCategory };
