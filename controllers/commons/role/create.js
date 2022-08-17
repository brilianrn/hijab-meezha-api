const { errors, successMessageTypes } = require('../../../constants');
const { Role } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateRole = async (req, res, next) => {
  const { name, code } = req.body;

  if (!name)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Role name' });
  if (!code)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Role code' });

  try {
    const newRole = await Role.create({ name, code });
    if (!newRole) return next(newRole);
    return res.status(201).json(
      formatResponse(
        true,
        201,
        successMessages(successMessageTypes.createData, 'Role'),
        {
          id: newRole.id,
          name: newRole.name,
          code: newRole.code,
        }
      )
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = { CreateRole };
