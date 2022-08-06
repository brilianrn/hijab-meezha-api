const { errors, otpType, successMessageTypes } = require('../../constants');
const { User, OtpCode } = require('../../models');
const { emailTransport } = require('../../services/nodemailer');
const formatResponse = require('../../utils/format-response');
const {
  generateOtpByPhone,
  generateDateDisplay,
} = require('../../utils/generate-items');
const { successMessages } = require('../../utils/messages-generate');

const CustomerRegister = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    fullname: req.body.fullname,
    gender: req.body.gender,
    password: req.body.password,
    phone_number: req.body.phone_number,
    photo_profile: req.body.photo_profile,
    username: req.body.username,
  };

  if (!newUser.email) {
    return next({ name: errors['400_EMPTY_EMAIL'] });
  }
  if (!newUser.password) {
    return next({ name: errors['400_EMPTY_PASSWORD'] });
  }
  if (!newUser.gender) {
    return next({ name: errors['400_EMPTY_GENDER'] });
  }
  if (!newUser.phone_number) {
    return next({ name: errors['400_EMPTY_PHONE_NUMBER'] });
  }
  if (!newUser.photo_profile) {
    return next({ name: errors['400_EMPTY_PHOTO_PROFILE'] });
  }
  if (!newUser.username) {
    return next({ name: errors['400_EMPTY_USERNAME'] });
  }
  if (!newUser.fullname) {
    return next({ name: errors['400_EMPTY_FULL_NAME'] });
  }

  try {
    const createUser = await User.create(newUser);
    if (!createUser) return next(createUser);

    const otpCode = await generateOtpByPhone(newUser.phone_number);
    const minutesToAdd = process.env.TIME_LIMIT;
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const dateDisplay = generateDateDisplay(expiredDate);
    emailTransport(
      {
        email: newUser.email,
        otpCode,
        dateDisplay,
        msgType: otpType.register,
        subject: `Authentication Code for ${otpType.register}`,
      },
      (err, _dataCb) => {
        if (err) return next(err);
      }
    );

    const newOtp = {
      user_id: createUser.id,
      token: otpCode,
      type: otpType.register,
      expired_date: expiredDate,
    };
    const createOtp = await OtpCode.create(newOtp);
    if (!createOtp) return next(createOtp);
    return res.status(200).json(
      formatResponse(true, 200, successMessages(successMessageTypes.register), {
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
      })
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = { CustomerRegister };
