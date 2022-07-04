const { User } = require('../../models');

class UserController {
  static async Register(req, res, next) {
    console.log(req.body);
    // const newUser = {
    //   email: req.body.email,
    //   fullname: req.body.fullname,
    //   gender: req.body.gender,
    //   password: req.body.password,
    //   phone_number: req.body.phone_number,
    //   photo_profile: req.body.photo_profile,
    //   username: req.body.username,
    //   is_active: req.body.is_active,
    // };

    // try {
    //   const data = await User.create(newUser);
    //   console.log(data, ' =========');
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}

module.exports = UserController;
