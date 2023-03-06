const Joi = require('joi');
const { isEmpty } = require('lodash');
const { errors } = require('../../constants');

const createOrderChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        productId: Joi.string().guid().required(),
        destinationAddressId: Joi.string().guid().required(),
        qty: Joi.number().min(1).required(),
        deliveryFee: Joi.number().min(1).required(),
        deliveryPlatformName: Joi.string().required(),
        deliveryId: Joi.string().required(),
        receiverName: Joi.string().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate(req.body);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      return next({
        name: errors[400],
        description: error,
      });
    }
  } catch (error) {
    return next({ name: 500, message: error.message });
  }
};

const paramIdOrderChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({
      ...req.params,
    });
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      return next({
        name: errors[400],
        description: error,
      });
    }
  } catch (error) {
    return next({ name: 500, message: error.message });
  }
};

module.exports = { createOrderChecking, paramIdOrderChecking };
