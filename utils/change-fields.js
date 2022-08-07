const { OtpCode } = require('../models');

const ChangeOtpStatus = async (req, _res, next) => {
  const { token, type } = req.body;

  if (!token) {
    return next({ name: errors['400_EMPTY_TOKEN'] });
  }
  if (!type) {
    return next({ name: errors['400_EMPTY_TYPE'] });
  }

  try {
    return await OtpCode.update(
      { is_active: false },
      { where: { token, type: type.toUpperCase() } }
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = { ChangeOtpStatus };
