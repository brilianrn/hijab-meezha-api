const { errMessageTypes } = require('../../constants');
const formatResponse = require('../../utils/format-response');
const { errorMessages } = require('../../utils/messages-generate');

const unauthorizedError = (_, res) => {
  res
    .status(401)
    .json(formatResponse(false, errorMessages(errMessageTypes.unauthorized)));
};

const notFoundError = (_, res) => {
  res
    .status(404)
    .json(formatResponse(false, errorMessages(errMessageTypes.notFound)));
};

const badRequestError = (err, res) => {
  res
    .status(400)
    .json(
      formatResponse(false, errorMessages(errMessageTypes.badRequest, err.name))
    );
};

module.exports = { unauthorizedError, notFoundError, badRequestError };
