const { errors, successMessageTypes, otpType } = require('../../../constants');
const { OtpCode, User } = require('../../../models');
const { ChangeOtpStatus } = require('../../../utils/change-fields');
const formatResponse = require('../../../utils/format-response');
const { generateDateDisplay } = require('../../../utils/generate-items');
const { generateToken } = require('../../../utils/jwt');
const { successMessages } = require('../../../utils/messages-generate');

const ConfirmOtp = async (req, res, next) => {
  const { token, type } = req.body;
  let payload = { token };

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
    if (!otp.isActive) return next({ name: errors['400_EXPIRED_OTP'] });

    if (new Date().getTime() > new Date(otp.expiredDate).getTime()) {
      await ChangeOtpStatus(req, res, next);
      return next({ name: errors['400_EXPIRED_OTP'] });
    }

    await ChangeOtpStatus(req, res, next);
    if (type?.toUpperCase() === otpType.register) {
      await User.update({ isActive: true }, { where: { id: otp.User.id } });
    } else {
      const user = await User.findOne({ where: { id: otp.User.id } });
      const minutesToAdd = process.env.TOKEN_TIME_LIMIT;
      const currentDate = new Date();
      const expiredDate = new Date(
        currentDate.getTime() + minutesToAdd * 60000
      );
      const dateDisplay = generateDateDisplay(expiredDate);
      payload = {
        ...payload,
        key: generateToken({
          ...payload,
          id: user.id,
          tokenExp: dateDisplay,
          key: user.password,
        }),
      };
    }

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.confirmOtp),
          payload
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { ConfirmOtp };
