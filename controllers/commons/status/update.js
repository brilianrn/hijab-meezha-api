const { errors, successMessageTypes } = require('../../../constants');
const { CommonStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateStatus = async (req, res, next) => {
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
    const updateStatus = await CommonStatus.update(
      {
        ...req.body,
        updatedBy: req.currentAdmin.id,
      },
      opt
    );
    if (!updateStatus) return next(updateStatus);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, 'CommonStatus'),
          existStatus
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateStatus };
