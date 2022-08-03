const {
  errSequelize,
  errors,
  errMessageTypes,
  errJwt,
} = require('../../constants');
const formatResponse = require('../../utils/format-response');
const { errorMessages } = require('../../utils/messages-generate');
const {
  unauthorizedError,
  notFoundError,
  badRequestError,
} = require('./common.error');

const errorHandler = (err, _req, res, _next) => {
  if (err.name.toString().toUpperCase() === errSequelize.validationError) {
    const arrErrors = [];
    for (let i = 0; i < err.errors.length; i++) {
      arrErrors.push(err.errors[i].message);
    }
    res.status(400).json(formatResponse(false, 400, arrErrors.toString()));
  } else if (
    err.name.toString().toUpperCase() === errSequelize.constraintError
  ) {
    res.status(400).json(formatResponse(false, 400, err.errors[0].message));
  } else if (
    err.name.toString().toUpperCase() === errors[401] ||
    err.name.toString().toUpperCase() === errJwt.tokenError
  ) {
    unauthorizedError(res);
  } else if (err.name.toString().toUpperCase() === errors[404]) {
    notFoundError(res);
  } else if (
    err.name.toString().toUpperCase() === errors['400_EMPTY_EMAIL'] ||
    err.name.toString().toUpperCase() === errors['400_EMPTY_PASSWORD']
  ) {
    badRequestError(err, res);
  } else if (
    err.name.toString().toUpperCase() === errors['400_WRONG_PASSWORD'] ||
    err.name.toString().toUpperCase() === errors['400_WRONG_EMAIL']
  ) {
    res
      .status(400)
      .json(
        formatResponse(false, 400, errorMessages(errMessageTypes.wrongAuth))
      );
  } else {
    console.log({ ...err, code: 500 });
    res
      .status(500)
      .json(err ? err : formatResponse(false, 500, 'Internal server error'));
  }
};

module.exports = errorHandler;
