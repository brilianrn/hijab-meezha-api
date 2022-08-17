const { errors, successMessageTypes } = require('../../../constants');
const { Role } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateRole = async (req, res, next) => {
  const { name, code, isActive } = req.body;
  const { id } = req.params;

  if (!name)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Role name' });
  if (!code)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Role code' });
  if (!isActive)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Is active role',
    });

  try {
    const opt = { where: { id } };
    const updateRole = await Role.update({ name, code, isActive }, opt);
    if (!updateRole) return next(updateRole);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, 'Role'),
          { name, code, isActive }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateRole };
