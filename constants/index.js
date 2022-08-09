const errSequelize = {
  validationError: 'SEQUELIZEVALIDATIONERROR',
  dbError: 'SEQUELIZEDATABASEERROR',
  constraintError: 'SEQUELIZEUNIQUECONSTRAINTERROR',
};

const errJwt = {
  tokenError: 'JSONWEBTOKENERROR',
};

const errors = {
  401: 'UNAUTHORIZED',
  404: 'NOT_FOUND',
  // ---------------- empty fields ------------------
  '400_EMPTY_EMAIL': 'EMAIL',
  '400_EMPTY_PASSWORD': 'PASSWORD',
  '400_EMPTY_FULL_NAME': 'FULL_NAME',
  '400_EMPTY_GENDER': 'GENDER',
  '400_EMPTY_PHONE_NUMBER': 'PHONE_NUMBER',
  '400_EMPTY_PHOTO_PROFILE': 'PHOTO_PROFILE',
  '400_EMPTY_USERNAME': 'USERNAME',
  '400_EMPTY_TOKEN': 'TOKEN',
  '400_EMPTY_TYPE': 'TYPE',
  // ---------------- exist fields ------------------
  '400_EXIST_EMAIL': 'EMAIL ALREADY EXIST',
  '400_EXIST_PHONE_NUMBER': 'PHONE NUMBER ALREADY EXIST',
  // ---------------- wrong fields ------------------
  '400_WRONG_EMAIL': 'WRONG EMAIL',
  '400_WRONG_PASSWORD': 'WRONG PASSWORD',
  // ---------------- expired fields ------------------
  '400_EXPIRED_OTP': 'EXPIRED OTP',
  // ---------------- not found fields ------------------
  '400_NOT_FOUND_USER': 'USER NOT FOUND',
};

const errMessageTypes = {
  notFound: 'NOT_FOUND',
  badRequest: 'BAD_REQUEST',
  unauthorized: 'UNAUTHORIZED',
  wrongAuth: 'WRONG_AUTH',
  expiredOtp: 'EXPIRED_OTP',
  exist: 'EXIST',
};

const successMessageTypes = {
  register: 'REGISTER',
  login: 'LOGIN',
  userInfo: 'USER_INFO',
  resendOtp: 'RESEND_OTP',
  confirmOtp: 'CONFIRM_OTP',
  forgotPassword: 'FORGOT_PASSWORD',
};

const otpType = {
  register: 'REGISTER',
  resetPassword: 'RESET_PASSWORD',
};

const otpStatus = {
  confirmed: 'CONFIRMED',
  notConfirmed: 'NOT_CONFIRMED',
};

module.exports = {
  errors,
  errSequelize,
  errMessageTypes,
  successMessageTypes,
  errJwt,
  otpType,
  otpStatus,
};
