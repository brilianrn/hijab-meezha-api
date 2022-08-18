const { errors, successMessageTypes } = require('../../../constants');
const { Category } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateProductCategory = async (req, res, next) => {
  const { name, description, photo } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Category name',
    });

  try {
    const category = await Category.create({
      name,
      description,
      photo,
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
          successMessages(successMessageTypes.createData, 'Category'),
          { name, description, photo }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateProductCategory };
