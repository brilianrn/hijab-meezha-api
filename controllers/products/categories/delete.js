const { successMessageTypes, errors } = require('../../../constants');
const { Category } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteProductCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const category = await Category.findOne(opt);
    if (!category) return next({ name: errors[404] });
    const deleteCategory = await Category.destroy(opt);
    if (!deleteCategory) return next(deleteCategory);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Category'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProductCategory };
