const { errors, successMessageTypes } = require('../../constants');
const { Admin } = require('../../models');
const formatResponse = require('../../utils/format-response');
const { successMessages } = require('../../utils/messages-generate');

const AdminInfo = async (req, res, next) => {
  if (!req.currentAdmin) return next({ name: errors[401] });

  try {
    const { id, email } = req.currentAdmin;
    const opt = {
      where: { id, email },
      attributes: {
        exclude: [
          'username',
          'phoneNumber',
          'password',
          'createdAt',
          'updatedAt',
        ],
      },
    };
    const data = await Admin.findOne(opt);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.userInfo),
          data
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { AdminInfo };
