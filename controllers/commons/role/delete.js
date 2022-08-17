const { errors, successMessageTypes } = require('../../../constants');
const { Role } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const role = await Role.findOne(opt);
    if (!role) return next({ name: errors[404] });
    const deleteRole = await Role.destroy(opt);
    if (!deleteRole) return next(deleteRole);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Role'),
          id
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteRole };
