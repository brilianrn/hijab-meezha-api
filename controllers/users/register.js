const { errors, otpType, successMessageTypes } = require("../../constants");
const { User, OtpCode } = require("../../models");
const { emailTransport } = require("../../services/nodemailer.service");
const formatResponse = require("../../utils/format-response");
const {
  generateOtpByPhone,
  generateDateDisplay,
} = require("../../utils/generate-items");
const { successMessages } = require("../../utils/messages-generate");

const CustomerRegister = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  };

  if (!newUser.email) {
    return next({ name: errors["400_EMPTY_FIELD"], description: "Email" });
  }
  if (!newUser.password) {
    return next({ name: errors["400_EMPTY_FIELD"], description: "Password" });
  }
  if (!newUser.phoneNumber) {
    return next({
      name: errors["400_EMPTY_FIELD"],
      description: "Phone number",
    });
  }
  if (!newUser.fullname) {
    return next({ name: errors["400_EMPTY_FIELD"], description: "Full name" });
  }

  try {
    let createUser = null;
    const findEmail = await FindUser({ email: newUser.email });
    const findPhoneNumber = await FindUser({
      phoneNumber: newUser.phoneNumber,
    });
    if (findEmail && !findPhoneNumber) {
      await UpdateUser(
        { id: findEmail.id },
        { phoneNumber: newUser.phoneNumber }
      );
    } else if (!findEmail && findPhoneNumber) {
      return next({ name: errors["400_EXIST_PHONE_NUMBER"] });
    } else if (findEmail && findPhoneNumber) {
      if (findEmail.id !== findPhoneNumber.id) {
        return next({ name: errors["400_EXIST_EMAIL"] });
      }
    } else if (!findEmail && !findPhoneNumber) {
      createUser = await User.create(newUser);
      if (!createUser) return next(createUser);
    }

    const otpCode = await generateOtpByPhone(newUser.phoneNumber);
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
        ? createUser.id
        : findEmail
        ? findEmail.id
        : findPhoneNumber.id,
      token: otpCode,
      type: otpType.register,
      expiredDate: expiredDate,
    };
    const createOtp = await OtpCode.create(newOtp);
    if (!createOtp) return next(createOtp);
    return res.status(200).json(
      formatResponse(true, 200, successMessages(successMessageTypes.register), {
        email: newUser.email,
        fullname: newUser.fullname,
        phoneNumber: newUser.phoneNumber,
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
      where: { ...payload, isActive: false },
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
