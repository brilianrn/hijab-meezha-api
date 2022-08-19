const { errors, successMessageTypes } = require('../../constants');
const { User } = require('../../models');
const formatResponse = require('../../utils/format-response');
const { successMessages } = require('../../utils/messages-generate');

const UserInfo = async (req, res, next) => {
  if (!req.currentUser) return next({ name: errors[401] });

  try {
    const { id, email } = req.currentUser;
    const opt = {
      where: { id, email },
      attributes: {
        exclude: [
          'id',
          'username',
          'phoneNumber',
          'password',
          'createdAt',
          'updatedAt',
        ],
      },
    };
    const data = await User.findOne(opt);
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

module.exports = { UserInfo };
