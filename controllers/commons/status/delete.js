const { errors, successMessageTypes } = require('../../../constants');
const { CommonStatus } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opt = { where: { id } };
    const existStatus = await CommonStatus.findOne(opt);
    if (!existStatus) return next({ name: errors[404] });
    const deleteRole = await CommonStatus.destroy(opt);
    if (!deleteRole) return next(deleteRole);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'CommonStatus'),
          id
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteStatus };
