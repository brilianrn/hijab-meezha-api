const { successMessageTypes, errors, otpType } = require('../../constants');
const { User, OtpCode } = require('../../models');
const { emailTransport } = require('../../services/nodemailer');
const formatResponse = require('../../utils/format-response');
const {
  generateOtpByPhone,
  generateDateDisplay,
} = require('../../utils/generate-items');
const { successMessages } = require('../../utils/messages-generate');

const FogotUseEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next({ name: errors['400_EMPTY_EMAIL'] });
  }

  try {
    const user = await User.findOne({ where: { email, isActive: true } });

    if (!user) return next({ name: errors['400_NOT_FOUND_USER'] });

    await FindAndUpdateOtp({ user_id: user.id, isActive: true });
    const otpCode = await generateOtpByPhone(user.phoneNumber);
    const minutesToAdd = process.env.TIME_LIMIT;
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const dateDisplay = generateDateDisplay(expiredDate);
    emailTransport(
      {
        email: user.email,
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
      type: otpType.resetPassword,
      expiredDate: expiredDate,
    };
    const createOtp = await OtpCode.create(newOtp);
    if (!createOtp) return next(createOtp);
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.forgotPassword),
        {
          email: user.email,
          fullname: user.fullname,
          phoneNumber: user.phoneNumber,
          confirmOtpLink: process.env.CONFIRM_OTP_LINK_REGISTER,
        }
      )
    );
  } catch (error) {
    return next(error);
  }
};

const FindAndUpdateOtp = async (payload) => {
  try {
    const otp = await OtpCode.findOne({ where: payload });

    if (!otp) return false;
    const update = await OtpCode.update(
      { isActive: false },
      { where: { id: otp.id } }
    );
    return update;
  } catch (error) {
    return error;
  }
};

module.exports = { FogotUseEmail };
