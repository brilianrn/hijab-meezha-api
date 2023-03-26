const Joi = require('joi');
const { isEmpty } = require('lodash');
const { errors } = require('../../constants');

const createAddressChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        addressName: Joi.string().required(),
        street: Joi.string().required(),
        rt: Joi.string().required(),
        rw: Joi.string().required(),
        village: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        country: Joi.string().required(),
        postCode: Joi.string().required(),
        isMainAddress: Joi.boolean().required(),
        provinceId: Joi.string().required(),
        cityId: Joi.string().required(),
        districtId: Joi.string().required(),
        villageId: Joi.string().required(),
        postCodeId: Joi.string().required(),
        addressNameReceiver: Joi.string().required(),
        addressPhoneReceiver: Joi.string().required(),
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
    console.log(error, ' ERRR');
    return next({ name: 500, message: error.message });
  }
};

const paramIdAddressChecking = async (req, _, next) => {
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
    console.log(error, ' ERRR');
    return next({ name: 500, message: error.message });
  }
};

const updateAddressChecking = async (req, _, next) => {
  try {
    const schema = Joi.object()
      .keys({
        id: Joi.string().guid().required(),
        addressName: Joi.string().required(),
        street: Joi.string().required(),
        rt: Joi.string().required(),
        rw: Joi.string().required(),
        village: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        country: Joi.string().required(),
        postCode: Joi.string().required(),
        isMainAddress: Joi.boolean().required(),
        provinceId: Joi.string().required(),
        cityId: Joi.string().required(),
        districtId: Joi.string().required(),
        villageId: Joi.string().required(),
        postCodeId: Joi.string().required(),
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
    console.log(error, ' ERRR');
    return next({ name: 500, message: error.message });
  }
};

module.exports = {
  createAddressChecking,
  updateAddressChecking,
  paramIdAddressChecking,
};
