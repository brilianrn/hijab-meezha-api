const { errors, successMessageTypes } = require('../../../constants');
const { Category } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailProductCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Category ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };
    const category = await Category.findOne(opt);

    if (!category) return next({ name: errors[404] });

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Category'),
          category
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailProductCategory };
