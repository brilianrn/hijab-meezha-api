const { errors, successMessageTypes } = require('../../../constants');
const { ProductStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateProductStatus = async (req, res, next) => {
  const { name, code } = req.body;
  const { id } = req.params;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product statues name',
    });
  if (!code)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Code',
    });

  try {
    const productStatus = await ProductStatus.findOne({
      where: { id },
    });
    if (productStatus) {
      if (productStatus.name === name && productStatus.code === code) {
        return next({
          name: errors['400_EXIST_DATA'],
          description: 'Product status',
        });
      }
    } else {
      return next({ name: errors['404'] });
    }
    const opt = { where: { id } };
    const payload = { name, code, updatedBy: req.currentAdmin.id };
    const updateProductStatus = await ProductStatus.update(payload, opt);
    if (!updateProductStatus) return next(updateProductStatus);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, 'Product status'),
          { name, code }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateProductStatus };
