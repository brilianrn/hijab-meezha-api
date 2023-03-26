const { errors, successMessageTypes } = require("../../../constants");
const {
  Order,
  CommonStatus,
  Product,
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
    const { products } = req.body;
    const orderCode = await generateOrderCode();
    const status = await CommonStatus.findOne({
      where: { code: "ODR-01" },
      attributes: ["id"],
    });
    const findProducts = await Product.findAll({
      where: { id: products.map((e) => e.productId), isActive: true },
      attributes: ["id", "stock", "categoryId"],
    });
    let tempFindProducts = [];
    findProducts.filter((product) => {
      const tempProduct = products.filter(
        (odrPrd) => odrPrd.productId === product.id
      )[0];
      if (tempProduct.qty <= product.stock) {
        return tempFindProducts.push({
          ...product.dataValues,
          qty: tempProduct.qty,
        });
      }
    });
    const destinationAddress = await Address.findOne({
      where: { id: req.body.destinationAddressId },
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
      categoryId: tempFindProducts[0].categoryId,
      orderStatusId: status.id,
      userId: id,
    });
    const orderProductPayload = tempFindProducts.map((e) => ({
      productId: e.id,
      orderId: order.id,
      qty: e.qty,
      createdBy: id,
      updatedBy: id,
    }));
    const orderProduct = await OrderProduct.bulkCreate(orderProductPayload);

    tempFindProducts.forEach(async (e) => {
      await Product.update({ stock: e.stock - e.qty }, { where: { id: e.id } });
      await Cart.destroy({ where: { productId: e.id, userId: id } });
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
