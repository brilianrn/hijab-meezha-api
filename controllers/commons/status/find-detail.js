const { errors, successMessageTypes } = require('../../../constants');
const { CommonStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opt = { where: { id } };
    const existStatus = await CommonStatus.findOne(opt);
    if (!existStatus) {
      return next({
        name: errors[404],
        description: 'Status',
      });
    }

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Status'),
          existStatus
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailStatus };
