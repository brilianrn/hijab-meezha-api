const Joi = require("joi");
const { isEmpty } = require("lodash");
const { errors } = require("../../constants");

const addProductCategoryTerms = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
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

const updateProductCategoryTerms = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({ ...req.body, ...req.params });
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

module.exports = { addProductCategoryTerms, updateProductCategoryTerms };
