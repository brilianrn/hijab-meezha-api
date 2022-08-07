const { errors, successMessageTypes, otpType } = require('../../constants');
const { OtpCode, User } = require('../../models');
const { ChangeOtpStatus } = require('../../utils/change-fields');
const formatResponse = require('../../utils/format-response');
const { successMessages } = require('../../utils/messages-generate');

const ConfirmOtp = async (req, res, next) => {
  const { token, type } = req.body;

  if (!token) {
    return next({ name: errors['400_EMPTY_TOKEN'] });
  }
  if (!type) {
    return next({ name: errors['400_EMPTY_TYPE'] });
  }

  try {
    const otp = await OtpCode.findOne({
      where: { token, type: type.toUpperCase() },
      include: [{ model: User, attributes: ['id'] }],
    });

    if (!otp) return next({ name: errors[404] });
    if (!otp.is_active) return next({ name: errors['400_EXPIRED_OTP'] });
    if (new Date().getTime() > new Date(otp.expired_date).getTime()) {
      await ChangeOtpStatus(req, res, next);
      return next({ name: errors['400_EXPIRED_OTP'] });
    }

    await ChangeOtpStatus(req, res, next);
    if (type?.toUpperCase() === otpType.register) {
      await User.update({ is_active: true }, { where: { id: otp.User.id } });
    }
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.confirmOtp),
          { token }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { ConfirmOtp };
