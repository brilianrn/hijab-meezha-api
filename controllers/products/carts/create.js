const { errors, successMessageTypes } = require('../../../constants');
const { Cart, Product } = require('../../../models');
const { UuidCheck, RoundNumberCheck } = require('../../../utils/check-fields');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateCart = async (req, res, next) => {
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
    if (findCart) {
      const tempQty = findCart.qty + qty;
      if (tempQty > product.stock)
        return next({
          name: errors['400_WRONG_FIELD'],
          description: 'Quantity',
        });
      await Cart.update(
        { qty: findCart.qty + qty },
        { where: { id: findCart.id } }
      );
      return res
        .status(200)
        .json(
          formatResponse(
            true,
            200,
            successMessages(successMessageTypes.updateData, 'Cart'),
            { ...findCart.dataValues, qty: tempQty }
          )
        );
    } else {
      const payload = {
        userId: id,
        productId,
        qty,
        categoryId: product.categoryId,
      };
      const cart = await Cart.create(payload);
      return res
        .status(201)
        .json(
          formatResponse(
            true,
            201,
            successMessages(successMessageTypes.createData, 'Cart'),
            cart
          )
        );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateCart };
