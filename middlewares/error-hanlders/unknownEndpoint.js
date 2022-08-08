const formatResponse = require('../../utils/format-response');

module.exports = (_req, res, _next) => {
  return res
    .status(404)
    .json(formatResponse(false, 404, 'End point not found!', null));
};
