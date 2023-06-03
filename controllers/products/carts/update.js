const {
  errors,
  successMessageTypes,
  excludeColumns,
} = require("../../../constants");
const { Product, Cart, ProductSize } = require("../../../models");
const { UuidCheck, RoundNumberCheck } = require("../../../utils/check-fields");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const UpdateCart = async (req, res, next) => {
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
    if (!productSize.Product)
      return next({
        name: errors["400_NOT_EXIST"],
        description: "Product",
      });
    if (productSize.stock < qty)
      return next({
        name: errors["400"],
        description: `Quantity max ${productSize.stock}`,
      });

    const findCart = await Cart.findOne({
      where: { userId: id, productSizeId },
    });
    if (!findCart)
      return next({
        name: errors["400_NOT_EXIST"],
        description: "Cart",
      });

    await Cart.update({ qty }, { where: { id: findCart.id } });
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Cart"),
          { ...findCart.dataValues, qty }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateCart };
