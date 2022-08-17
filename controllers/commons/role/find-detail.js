const { errors, successMessageTypes } = require('../../../constants');
const { Role } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailRole = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Role ID' });

  try {
    const opt = { where: { id } };
    const role = await Role.findOne(opt);

    if (!role) return next({ name: errors[404] });

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Role'),
          role
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailRole };
