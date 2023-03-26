const { errors, otpType, successMessageTypes } = require("../../../constants");
const { User, OtpCode } = require("../../../models");
const { emailTransport } = require("../../../services/nodemailer.service");
const formatResponse = require("../../../utils/format-response");
const {
  generateOtpByPhone,
  generateDateDisplay,
} = require("../../../utils/generate-items");
const { successMessages } = require("../../../utils/messages-generate");

const ResendOtp = async (req, res, next) => {
  const { email, phoneNumber } = req.body;

  if (!email) {
    return next({ name: errors["400_EMPTY_EMAIL"] });
  }
  if (!phoneNumber) {
    return next({ name: errors["400_EMPTY_PHONE_NUMBER"] });
  }

  try {
    const user = await User.findOne({ where: { email, phoneNumber } });
    if (!user) return next({ name: errors["400_NOT_FOUND_USER"] });

    await OtpCode.update({ isActive: false }, { where: { user_id: user.id } });
    const otpCode = await generateOtpByPhone(phoneNumber);
    const minutesToAdd = process.env.TIME_LIMIT;
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const dateDisplay = generateDateDisplay(expiredDate);
    emailTransport(
      {
        email,
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
      user_id: user.id,
      token: otpCode,
      type: otpType.register,
      expiredDate: expiredDate,
    };
    const createOtp = await OtpCode.create(newOtp);
    if (!createOtp) return next(createOtp);
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.resendOtp),
        {
          email,
          phoneNumber,
          confirmOtpLink: process.env.CONFIRM_OTP_LINK_REGISTER,
        }
      )
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = { ResendOtp };
