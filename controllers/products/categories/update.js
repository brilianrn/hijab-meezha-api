const { errors, successMessageTypes } = require('../../../constants');
const { Category } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateCategory = async (req, res, next) => {
  const { name, description, photo } = req.body;
  const { id } = req.params;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Category name',
    });

  try {
    const opt = { where: { id } };
    const payload = {
      name,
      description,
      photo,
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
          successMessages(successMessageTypes.updateData, 'Product category'),
          { name, description, photo }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateCategory };
