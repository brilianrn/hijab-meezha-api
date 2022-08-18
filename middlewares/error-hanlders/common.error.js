const { errMessageTypes } = require('../../constants');
const formatResponse = require('../../utils/format-response');
const { errorMessages } = require('../../utils/messages-generate');

const unauthorizedError = (_, res) => {
  return res
    .status(401)
    .json(
      formatResponse(false, 401, errorMessages(errMessageTypes.unauthorized))
    );
};

const notFoundError = (_, res) => {
  res
    .status(404)
    .json(formatResponse(false, 404, errorMessages(errMessageTypes.notFound)));
};

const badRequestError = (err, res) => {
  res
    .status(400)
    .json(
      formatResponse(
        false,
        400,
        errorMessages(errMessageTypes.badRequest, err.name)
      )
    );
};

const badRequestEmptyField = (err, res) => {
  res
    .status(400)
    .json(
      formatResponse(
        false,
        400,
        errorMessages(errMessageTypes.badRequestEmptyField, err.description)
      )
    );
};

const badRequestNotExist = (err, res) => {
  res
    .status(400)
    .json(
      formatResponse(
        false,
        400,
        errorMessages(errMessageTypes.badRequestEmptyField, err.description)
      )
    );
};

module.exports = {
  unauthorizedError,
  notFoundError,
  badRequestError,
  badRequestEmptyField,
  badRequestNotExist,
};
