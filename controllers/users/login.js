const { successMessageTypes, errors } = require('../../constants');
const { User } = require('../../models');
const { comparePassword } = require('../../utils/bycript');
const formatResponse = require('../../utils/format-response');
const { generateToken } = require('../../utils/jwt');
const { successMessages } = require('../../utils/messages-generate');

const CustomerLogin = async (req, res, next) => {
  if (req.body.email) {
    if (req.body.password) {
      const user = { email: req.body.email, password: req.body.password };
      try {
        const findUser = await User.findOne({ where: { email: user.email } });
        if (findUser && findUser.isActive) {
          const checkPassword = comparePassword(
            user.password,
            findUser.password
          );
          const payload = {
            id: findUser.id,
            email: findUser.email,
            fullname: findUser.fullname,
            gender: findUser.gender,
          };
          if (checkPassword) {
            const access_token = generateToken(payload);
            return res
              .status(200)
              .json(
                formatResponse(
                  true,
                  200,
                  successMessages(successMessageTypes.login),
                  { access_token }
                )
              );
          } else {
            return next({ name: errors['400_WRONG_PASSWORD'] });
          }
        } else {
          return next({ name: errors['400_WRONG_EMAIL'] });
        }
      } catch (error) {
        return next(error);
      }
    } else {
      return next({ name: errors['400_EMPTY_PASSWORD'] });
    }
  } else {
    return next({ name: errors['400_EMPTY_EMAIL'] });
  }
};

module.exports = { CustomerLogin };
