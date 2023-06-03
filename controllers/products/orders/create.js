const { errors, successMessageTypes } = require("../../../constants");
const {
  Order,
  CommonStatus,
  Product,
  ProductSize,
  Address,
  OrderProduct,
  Cart,
} = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");
const referralCodeGenerator = require("referral-code-generator");

const CreateOrder = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const { products, destinationAddressId } = req.body;
    const orderCode = await generateOrderCode();
    const status = await CommonStatus.findOne({
      where: { code: "ODR-01" },
      attributes: ["id"],
    });
    const findProducts = await ProductSize.findAll({
      where: { id: products.map((e) => e.productSizeId), isActive: true },
      attributes: ["id", "stock", "productId", "sizeId"],
      include: [
        {
          model: Product,
          attributes: ["categoryId"],
        },
      ],
    });

    let tempFindProducts = [];
    findProducts.filter((product) => {
      const tempProduct = products.filter(
        (odrPrd) => odrPrd.productSizeId === product.id
      )[0];
      if (tempProduct.qty <= product.stock) {
        return tempFindProducts.push({
          ...product.dataValues,
          qty: tempProduct.qty,
        });
      }
    });
    const destinationAddress = await Address.findOne({
      where: { id: destinationAddressId },
      attributes: ["id"],
    });
    if (!destinationAddress) {
      return next({
        name: errors["400"],
        description: "Destination addess not found",
      });
    }
    const order = await Order.create({
      ...req.body,
      orderCode,
      categoryId: tempFindProducts[0]?.Product?.categoryId,
      orderStatusId: status.id,
      userId: id,
    });
    const orderProductPayload = tempFindProducts.map((e) => ({
      productSizeId: e.id,
      orderId: order.id,
      qty: e.qty,
      createdBy: id,
      updatedBy: id,
    }));
    const orderProduct = await OrderProduct.bulkCreate(orderProductPayload);

    tempFindProducts.forEach(async (e) => {
      await ProductSize.update(
        { stock: e.stock - e.qty },
        { where: { id: e.id } }
      );
      await Product.update(
        { totalStock: e.stock - e.qty },
        { where: { id: e.productId } }
      );
      await Cart.destroy({ where: { productSizeId: e.id, userId: id } });
    });

    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, "Order"),
          { ...orderProduct, orderId: order.id }
        )
      );
  } catch (error) {
    next(error);
  }
};

const generateOrderCode = async () => {
  try {
    const orderCode = referralCodeGenerator.alphaNumeric("uppercase", 3, 2);
    const existCode = await Order.findOne({ where: { orderCode } });
    if (existCode && existCode.orderCode === orderCode) {
      generateOrderCode();
    } else {
      return orderCode;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { CreateOrder };
