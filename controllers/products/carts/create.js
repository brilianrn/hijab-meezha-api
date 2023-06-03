const {
  errors,
  successMessageTypes,
  excludeColumns,
} = require("../../../constants");
const { Cart, Product, ProductSize } = require("../../../models");
const { UuidCheck, RoundNumberCheck } = require("../../../utils/check-fields");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const CreateCart = async (req, res, next) => {
  const { productSizeId, qty } = req.body;
  const { id } = req.currentUser;

  if (!productSizeId)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Product ID",
    });
  if (!UuidCheck(productSizeId))
    return next({
      name: errors["400_WRONG_DATA_TYPE"],
      description: "Product ID",
    });
  if (!qty)
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Product QTY",
    });
  if (!RoundNumberCheck(qty))
    return next({
      name: errors["400_NOT_NUMBER"],
      description: "Product QTY-round",
    });

  try {
    const productSize = await ProductSize.findOne({
      where: { id: productSizeId },
      attributes: { exclude: excludeColumns },
      include: [{ model: Product, attributes: { exclude: excludeColumns } }],
    });

    if (!productSize)
      return next({
        name: errors["400_NOT_EXIST"],
        description: "Product",
      });
    if (productSize.Product.stock < qty)
      return next({
        name: errors["400_WRONG_FIELD"],
        description: "Quantity",
      });

    const findCart = await Cart.findOne({
      where: { userId: id, productSizeId },
    });
    if (findCart) {
      const tempQty =
        productSize.Product.stock < qty ? findCart.qty + qty : findCart.qty;
      if (tempQty > productSize.Product.stock)
        return next({
          name: errors["400_WRONG_FIELD"],
          description: "Quantity",
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
            successMessages(successMessageTypes.updateData, "Cart"),
            { ...findCart.dataValues, qty: tempQty }
          )
        );
    } else {
      const payload = {
        userId: id,
        productSizeId,
        qty,
        categoryId: productSize.Product.categoryId,
      };
      const cart = await Cart.create(payload);
      return res
        .status(201)
        .json(
          formatResponse(
            true,
            201,
            successMessages(successMessageTypes.createData, "Cart"),
            cart
          )
        );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateCart };
