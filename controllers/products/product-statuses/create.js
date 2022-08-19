const { errors, successMessageTypes } = require('../../../constants');
const { ProductStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateProductStatus = async (req, res, next) => {
  const { name, code } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product status name',
    });
  if (!code)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Code',
    });

  try {
    const productStatus = await ProductStatus.findOne({
      where: { name, code, isActive: true },
    });
    if (productStatus) {
      if (productStatus.name === name && productStatus.code === code) {
        return next({
          name: errors['400_EXIST_DATA'],
          description: 'Product status',
        });
      }
    }

    const newProductStatus = await ProductStatus.create({
      name,
      code,
      createdBy: id,
      updatedBy: id,
    });
    if (!newProductStatus) return next(newProductStatus);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Product status'),
          { name, code }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateProductStatus };
