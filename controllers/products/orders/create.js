const { errors, successMessageTypes } = require('../../../constants');
const { Order, CommonStatus, Product, Address } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');
const referralCodeGenerator = require('referral-code-generator');

const CreateOrder = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const orderCode = await generateOrderCode();
    const status = await CommonStatus.findOne({
      where: { code: 'ODR-01' },
      attributes: ['id'],
    });
    const product = await Product.findOne({
      where: { id: req.body.productId },
      attributes: ['stock'],
    });
    const destinationAddress = await Address.findOne({
      where: { id: req.body.destinationAddressId },
      attributes: ['id'],
    });
    if (product.stock < req.body.qty) {
      return next({
        name: errors['400'],
        description: 'Qty must be smaller from stock product',
      });
    }
    if (!destinationAddress) {
      return next({
        name: errors['400'],
        description: 'Destination addess not found',
      });
    }
    const order = await Order.create({
      ...req.body,
      orderCode,
      orderStatusId: status.id,
      userId: id,
    });
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Order'),
          order
        )
      );
  } catch (error) {
    next(error);
  }
};

const generateOrderCode = async () => {
  try {
    const orderCode = referralCodeGenerator.alphaNumeric('uppercase', 3, 2);
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
