const { successMessageTypes } = require('../../../constants');
const { CommonStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateStatus = async (req, res, next) => {
  const { id } = req.currentAdmin;
  try {
    const newStatus = await CommonStatus.create({
      ...req.body,
      createdBy: id,
      updatedBy: id,
    });
    if (!newStatus) return next(newStatus);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'CommonStatus'),
          newStatus
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { CreateStatus };
