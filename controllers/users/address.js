const { successMessageTypes, errors } = require('../../constants');
const { Address } = require('../../models');
const formatResponse = require('../../utils/format-response');
const { successMessages } = require('../../utils/messages-generate');

const FindAll = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const addresses = await Address.findAll({ where: { userId: id } });
    if (!addresses.length) {
      return next({
        name: errors['404'],
        description: 'Address',
      });
    }
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.findAll, 'Address'),
          addresses
        )
      );
  } catch (error) {
    next(error);
  }
};

const Add = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const address = await Address.create({
      ...req.body,
      userId: id,
      createdBy: id,
      updatedBy: id,
    });
    if (!address) return next(address);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Address'),
          address
        )
      );
  } catch (error) {
    next(error);
  }
};

const FindOne = async (req, res, next) => {
  try {
    const opt = { where: { id: req.params.id } };
    const address = await Address.findOne(opt);
    if (!address) {
      return next({
        name: errors['404'],
        description: 'Address',
      });
    }
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.findDetail, 'Address'),
          address
        )
      );
  } catch (error) {
    next(error);
  }
};

const Update = async (req, res, next) => {
  try {
    const opt = { where: { id: req.params.id } };
    const existAddress = await Address.findOne(opt);
    if (!existAddress) {
      return next({
        name: errors['404'],
        description: 'Address',
      });
    }
    const { id } = req.currentUser;
    const payload = {
      ...req.body,
      updatedBy: id,
    };
    const [address] = await Address.update(payload, opt);
    if (!address) return next(address);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.updateData, 'Address'),
          existAddress
        )
      );
  } catch (error) {
    next(error);
  }
};

const Delete = async (req, res, next) => {
  try {
    const opt = { where: { id: req.params.id } };
    const existAddress = await Address.findOne(opt);
    if (!existAddress) {
      return next({
        name: errors['404'],
        description: 'Address',
      });
    }
    const address = await Address.destroy(opt);
    if (!address) return next(address);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.deleteData, 'Address'),
          existAddress
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { Add, Update, FindOne, Delete, FindAll };
