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
    password: req.body.password,
    phone_number: req.body.phone_number,
  };

  if (!newUser.email) {
    return next({ name: errors['400_EMPTY_EMAIL'] });
  }
  if (!newUser.password) {
    return next({ name: errors['400_EMPTY_PASSWORD'] });
  }
  if (!newUser.phone_number) {
    return next({ name: errors['400_EMPTY_PHONE_NUMBER'] });
  }
  if (!newUser.fullname) {
    return next({ name: errors['400_EMPTY_FULL_NAME'] });
  }

  try {
    let createUser = null;
    const findEmail = await FindUser({ email: newUser.email });
    const findPhoneNumber = await FindUser({
      phone_number: newUser.phone_number,
    });
    if (findEmail && !findPhoneNumber) {
      await UpdateUser(
        { id: findEmail.id },
        { phone_number: newUser.phone_number }
      );
    } else if (!findEmail && findPhoneNumber) {
      return next({ name: errors['400_EXIST_PHONE_NUMBER'] });
    } else if (findEmail && findPhoneNumber) {
      if (findEmail.id !== findPhoneNumber.id) {
        return next({ name: errors['400_EXIST_EMAIL'] });
      }
    } else if (!findEmail && !findPhoneNumber) {
      createUser = await User.create(newUser);
      if (!createUser) return next(createUser);
    }

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
      user_id: createUser
        ? createUser?.id
        : findEmail
        ? findEmail.id
        : findPhoneNumber.id,
      token: otpCode,
      type: otpType.register,
      expired_date: expiredDate,
    };
    const createOtp = await OtpCode.create(newOtp);
    if (!createOtp) return next(createOtp);
    return res.status(200).json(
      formatResponse(true, 200, successMessages(successMessageTypes.register), {
        email: newUser.email,
        fullname: newUser.fullname,
        phoneNumber: newUser.phone_number,
        confirmOtpLink: process.env.CONFIRM_OTP_LINK_REGISTER,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const FindUser = async (payload) => {
  try {
    const user = await User.findOne({
      where: { ...payload, is_active: false },
    });
    return user || null;
  } catch (error) {
    return error;
  }
};

const UpdateUser = async (opt, payload) => {
  try {
    const update = await User.update(payload, { where: opt });
    return update || null;
  } catch (error) {
    return error;
  }
};

module.exports = { CustomerRegister };
