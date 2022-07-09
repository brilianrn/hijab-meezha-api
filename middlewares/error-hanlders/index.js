const { errSequelize, errors, errMessageTypes } = require('../../constants');
const formatResponse = require('../../utils/format-response');
const { errorMessages } = require('../../utils/messages-generate');

const errorHandler = (err, _req, res, _next) => {
  if (err.name.toString().toUpperCase() === errSequelize.validationError) {
    const arrErrors = [];
    for (let i = 0; i < err.errors.length; i++) {
      arrErrors.push(err.errors[i].message);
    }
    res.status(400).json(formatResponse(false, arrErrors.toString()));
  } else if (
    err.name.toString().toUpperCase() === errSequelize.constraintError
  ) {
    res.status(400).json(formatResponse(false, err.errors[0].message));
  } else if (err.name.toString().toUpperCase() === errors[401]) {
    res.status(401).json({ message: err.message });
  } else if (err.name.toString().toUpperCase() === errors[404]) {
    res
      .status(404)
      .json(formatResponse(false, errorMessages(errMessageTypes.notFound)));
  } else if (
    err.name.toString().toUpperCase() === errors['400_EMPTY_EMAIL'] ||
    err.name.toString().toUpperCase() === errors['400_EMPTY_PASSWORD']
  ) {
    res
      .status(400)
      .json(
        formatResponse(
          false,
          errorMessages(errMessageTypes.badRequest, err.name)
        )
      );
  } else if (
    err.name.toString().toUpperCase() === errors['400_WRONG_PASSWORD'] ||
    err.name.toString().toUpperCase() === errors['400_WRONG_EMAIL']
  ) {
    res
      .status(400)
      .json(formatResponse(false, errorMessages(errMessageTypes.wrongAuth)));
  } else {
    console.log({ ...err, code: 500 });
    res
      .status(500)
      .json(err ? err : formatResponse(false, 'Internal server error'));
  }
};

module.exports = errorHandler;
