const { errors, successMessageTypes } = require('../../../constants');
const { Size, Category } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');
const { UuidCheck } = require('../../../utils/check-fields');

const CreateProductSize = async (req, res, next) => {
  const { name, categoryId } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Size name' });
  if (!categoryId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Category ID',
    });
  if (!UuidCheck(categoryId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Category ID',
    });

  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return next({
        name: errors['400_NOT_EXIST'],
        description: 'Category ID',
      });
    }

    const checkSize = await Size.findOne({ where: { name, categoryId } });
    if (checkSize) {
      if (checkSize.name === name && checkSize.categoryId === categoryId) {
        return next({
          name: errors['400_EXIST_DATA'],
          description: 'Size',
        });
      }
    }

    const size = await Size.create({
      name,
      categoryId,
      createdBy: id,
      updatedBy: id,
    });
    if (!size) return next(size);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Size'),
          { name, categoryId }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateProductSize };
