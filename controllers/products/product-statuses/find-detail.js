const { errors, successMessageTypes } = require('../../../constants');
const { ProductStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailProductStatus = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product status ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };

    const productStatus = await ProductStatus.findOne(opt);

    if (!productStatus) return next({ name: errors[404] });
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Product status'),
          productStatus
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailProductStatus };
