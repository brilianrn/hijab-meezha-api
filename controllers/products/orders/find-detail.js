const {
  errors,
  successMessageTypes,
  excludeColumns,
} = require("../../../constants");
const {
  Product,
  ProductThumbnail,
  ProductImage,
  OrderProduct,
  Order,
  CommonStatus,
  Tax,
  Address,
  Category,
  Promo,
  ProductSize,
  Size,
} = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const FindDetailOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opt = {
      where: { id },
      attributes: { exclude: ["updatedAt", "createdBy", "updatedBy"] },
      include: [
        {
          model: OrderProduct,
          attributes: ["id", "qty"],
          include: [
            {
              model: ProductSize,
              attributes: { exclude: excludeColumns },
              include: [
                {
                  model: Product,
                  attributes: { exclude: excludeColumns },
                  include: [
                    { model: ProductThumbnail, attributes: ["url"] },
                    { model: ProductImage, attributes: ["url"] },
                  ],
                },
                { model: Size, attributes: ["name"] },
              ],
            },
          ],
        },
        { model: CommonStatus, attributes: ["name", "code"] },
        { model: Tax, attributes: ["name", "amount"] },
        { model: Address, attributes: { exclude: excludeColumns } },
        { model: Category, attributes: { exclude: excludeColumns } },
        { model: Promo, attributes: { exclude: excludeColumns } },
      ],
    };
    const existOrder = await Order.findOne(opt);
    if (!existOrder) {
      return next({ name: errors[404], description: "Order" });
    }

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, "Order"),
          existOrder
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailOrder };
