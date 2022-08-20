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
  badRequestEmptyField,
  badRequestNotExist,
  badRequestWrongDataType,
  badRequestExistData,
  badRequestNotNumber,
  badRequestWrongField,
} = require('./common.error');

const errorHandler = (err, req, res, _next) => {
  if (err?.name?.toString().toUpperCase() === errSequelize.validationError) {
    const arrErrors = [];
    for (let i = 0; i < err.errors.length; i++) {
      arrErrors.push(err.errors[i].message);
    }
    res.status(400).json(formatResponse(false, 400, arrErrors.toString()));
  } else if (
    err?.name?.toString().toUpperCase() === errSequelize.constraintError
  ) {
    res.status(400).json(formatResponse(false, 400, err.errors[0].message));
  } else if (
    err?.name?.toString().toUpperCase() === errors[401] ||
    err?.name?.toString().toUpperCase() === errJwt.tokenError ||
    err?.name?.toString().toUpperCase() === errJwt.tokenExp
  ) {
    unauthorizedError(req, res);
  } else if (err?.name?.toString().toUpperCase() === errors[404]) {
    notFoundError(req, res);
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_FIELD']
  ) {
    badRequestEmptyField(err, res);
  } else if (err?.name?.toString().toUpperCase() === errors['400_NOT_EXIST']) {
    badRequestNotExist(err, res);
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_WRONG_FIELD']
  ) {
    badRequestWrongField(err, res);
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_WRONG_DATA_TYPE']
  ) {
    badRequestWrongDataType(err, res);
  } else if (err?.name?.toString().toUpperCase() === errors['400_EXIST_DATA']) {
    badRequestExistData(err, res);
  } else if (err?.name?.toString().toUpperCase() === errors['400_NOT_NUMBER']) {
    badRequestNotNumber(err, res);
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_EMAIL'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_FULL_NAME'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_GENDER'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_TOKEN'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_TYPE'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_USERNAME'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_PHONE_NUMBER'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_PHOTO_PROFILE'] ||
    err?.name?.toString().toUpperCase() === errors['400_NOT_FOUND_USER'] ||
    err?.name?.toString().toUpperCase() === errors['400_EXIST_EMAIL'] ||
    err?.name?.toString().toUpperCase() === errors['400_EXIST_PHONE_NUMBER'] ||
    err?.name?.toString().toUpperCase() === errors['400_INVALID_TOKEN'] ||
    err?.name?.toString().toUpperCase() === errors['400_EMPTY_PASSWORD']
  ) {
    badRequestError(err, res || err.description);
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_WRONG_TOKEN'] ||
    err?.name?.toString().toUpperCase() === errors['400_WRONG_EMAIL']
  ) {
    res
      .status(400)
      .json(
        formatResponse(false, 400, errorMessages(errMessageTypes.wrongAuth))
      );
  } else if (
    err?.name?.toString().toUpperCase() === errors['400_EXPIRED_OTP']
  ) {
    res
      .status(400)
      .json(
        formatResponse(false, 400, errorMessages(errMessageTypes.expiredOtp))
      );
  } else {
    console.log({ errors: err, code: 500 });
    res.status(500).json(formatResponse(false, 500, 'Internal server error!'));
  }
};

module.exports = errorHandler;
