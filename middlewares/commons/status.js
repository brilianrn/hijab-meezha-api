const Joi = require('joi');
const { isEmpty } = require('lodash');
const { errors } = require('../../constants');

const createStatusChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        type: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
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

const paramIdStatusChecking = async (req, _, next) => {
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

const updateStatusChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
        type: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({
      ...req.params,
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

module.exports = {
  createStatusChecking,
  updateStatusChecking,
  paramIdStatusChecking,
};
