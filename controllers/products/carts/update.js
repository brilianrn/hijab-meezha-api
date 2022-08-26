const { errors, successMessageTypes } = require('../../../constants');
const { Product, Cart } = require('../../../models');
const { UuidCheck, RoundNumberCheck } = require('../../../utils/check-fields');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateCart = async (req, res, next) => {
  const { productId, qty } = req.body;
  const { id } = req.currentUser;

  if (!productId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product ID',
    });
  if (!UuidCheck(productId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Product ID',
    });
  if (!qty)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product QTY',
    });
  if (!RoundNumberCheck(qty))
    return next({
      name: errors['400_NOT_NUMBER'],
      description: 'Product QTY-round',
    });

  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product)
      return next({
        name: errors['400_NOT_EXIST'],
        description: 'Product',
      });
    if (product.stock < qty)
      return next({
        name: errors['400_WRONG_FIELD'],
        description: 'Quantity',
      });

    const findCart = await Cart.findOne({ where: { userId: id, productId } });
    if (!findCart)
      return next({
        name: errors['400_NOT_EXIST'],
        description: 'Cart',
      });

    await Cart.update({ qty }, { where: { id: findCart.id } });
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.updateData, 'Cart'),
          { ...findCart.dataValues, qty }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateCart };
