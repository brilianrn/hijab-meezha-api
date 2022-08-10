const { errors, successMessageTypes } = require('../../constants');
const { User } = require('../../models');
const formatResponse = require('../../utils/format-response');
const { verifyToken } = require('../../utils/jwt');
const { successMessages } = require('../../utils/messages-generate');

const ResetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { access_token } = req.params;

  if (!password) return next({ name: errors['400_EMPTY_PASSWORD'] });
  try {
    const { id, key, tokenExp } = verifyToken(access_token);
    if (!id || !key) return next({ name: errors['401'] });

    const expDate = new Date(tokenExp.split('at').join(' '));
    if (expDate.getTime() < new Date().getTime())
      return next({ name: errors['401'] });

    const user = await User.findOne({ where: { id } });
    if (!user) return next({ name: errors['401'] });

    if (user.password !== key) return next({ name: errors['401'] });

    const update = await User.update({ password }, { where: { id } });
    if (!update) return next(update);

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.resetPassword),
          { email: user.email }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { ResetPassword };
