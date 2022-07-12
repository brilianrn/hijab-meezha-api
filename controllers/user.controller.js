const { successMessageTypes, errors } = require('../constants');
const { User } = require('../models');
const { comparePassword } = require('../utils/bycript');
const formatResponse = require('../utils/format-response');
const { generateToken } = require('../utils/jwt');
const { successMessages } = require('../utils/messages-generate');

class UserController {
  static async register(req, res, next) {
    const newUser = {
      email: req.body.email,
      fullname: req.body.fullname,
      gender: req.body.gender,
      password: req.body.password,
      phone_number: req.body.phone_number,
      photo_profile: req.body.photo_profile,
      username: req.body.username,
    };

    try {
      await User.create(newUser);
      return res.status(200).json(
        formatResponse(true, successMessages(successMessageTypes.register), {
          email: newUser.email,
          username: newUser.username,
          fullname: newUser.fullname,
        })
      );
    } catch (error) {
      return next(error);
    }
  }

  static async login(req, res, next) {
    if (req?.body?.email) {
      if (req?.body?.password) {
        const user = { email: req.body.email, password: req.body.password };
        try {
          const findUser = await User.findOne({ where: { email: user.email } });
          if (findUser && findUser?.is_active) {
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
              return res.status(200).json(
                formatResponse(
                  true,
                  successMessages(successMessageTypes.login),
                  {
                    access_token,
                  }
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
  }

  static async userInfo(req, res, next) {
    if (!req.currentUser) return next({ name: errors[401] });

    try {
      const { id, email } = req.currentUser;
      const opt = {
        where: {
          id,
          email,
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      };
      const data = await User.findOne(opt);
      return res
        .status(200)
        .json(
          formatResponse(
            true,
            successMessages(successMessageTypes.userInfo),
            data
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserController;
