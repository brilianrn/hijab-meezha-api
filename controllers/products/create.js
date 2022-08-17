const { errors, otpType, successMessageTypes } = require('../../constants');
const { User, OtpCode } = require('../../models');
const { emailTransport } = require('../../services/nodemailer');
const formatResponse = require('../../utils/format-response');
const {
  generateOtpByPhone,
  generateDateDisplay,
} = require('../../utils/generate-items');
const { successMessages } = require('../../utils/messages-generate');

const CreateProduct = (req, res, next) => {
  const {
    categoryId,
    sizeId,
    taxId,
    promoId,
    name,
    description,
    stock,
    price,
    priceAfterDiscount,
    code,
  } = req.body;
};

module.exports = { CreateProduct };
