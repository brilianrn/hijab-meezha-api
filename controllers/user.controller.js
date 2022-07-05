const { successMessageTypes } = require('../constants');
const { User } = require('../models');
const formatResponse = require('../utils/format-response');
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
      res
        .status(200)
        .json(
          formatResponse(true, successMessages(successMessageTypes.register), {
            email: newUser.email,
            username: newUser.username,
            fullname: newUser.fullname,
          })
        );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
