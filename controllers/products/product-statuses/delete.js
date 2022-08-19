const { successMessageTypes, errors } = require('../../../constants');
const { ProductStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteProductStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id, isActive: true } };
    const productStatus = await ProductStatus.findOne(opt);
    if (!productStatus) return next({ name: errors[404] });
    const deleteProductStatus = await ProductStatus.destroy(opt);
    if (!deleteProductStatus) return next(deleteProductStatus);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Product status'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProductStatus };
