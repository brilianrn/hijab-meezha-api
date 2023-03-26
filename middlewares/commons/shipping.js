const Joi = require("joi");
const { isEmpty } = require("lodash");
const { errors } = require("../../constants");

const shippingPricesTerm = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        courier: Joi.string().required(),
        weight: Joi.number().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({
      ...req.body,
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

module.exports = { shippingPricesTerm };
