const Joi = require("joi");
const { isEmpty } = require("lodash");
const { errors } = require("../../constants");

const productForms = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        categoryId: Joi.string().guid().required(),
        sizeId: Joi.string().guid().required(),
        taxId: Joi.string().guid().required(),
        productStatusId: Joi.string().guid().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        code: Joi.string().required(),
        stock: Joi.number().min(1).required(),
        price: Joi.number().min(1).required(),
        priceAfterDiscount: Joi.number().min(1).required(),
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

const productIdRequired = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate(req.params);
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

module.exports = { productForms, productIdRequired };
