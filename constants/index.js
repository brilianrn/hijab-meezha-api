const errSequelize = {
  validationError: 'SEQUELIZEVALIDATIONERROR',
  dbError: 'SEQUELIZEDATABASEERROR',
  constraintError: 'SEQUELIZEUNIQUECONSTRAINTERROR',
};

const errJwt = {
  tokenError: 'JSONWEBTOKENERROR',
  tokenExp: 'TOKENEXPIREDERROR',
};

const errors = {
  401: 'UNAUTHORIZED',
  404: 'NOT_FOUND',
  // ---------------- empty fields ------------------
  400: 'BAD_REQUEST',
  '400_EMPTY_FIELD': 'EMPTY_FIELD', // general with description
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
  '400_EXIST_DATA': ' EXIST DATA', // general
  '400_NOT_EXIST': 'NOT EXIST', // general
  '400_EXIST_EMAIL': 'EMAIL ALREADY EXIST',
  '400_EXIST_PHONE_NUMBER': 'PHONE NUMBER ALREADY EXIST',
  // ---------------- wrong fields ------------------
  '400_WRONG_DATA_TYPE': 'WRONG DATA TYPE', // general
  '400_WRONG_FIELD': 'WRONG FIELD', // general
  '400_NOT_NUMBER': 'NOT NUMBER', // general
  '400_WRONG_EMAIL': 'WRONG EMAIL',
  '400_WRONG_PASSWORD': 'WRONG PASSWORD',
  // ---------------- expired fields ------------------
  '400_EXPIRED_OTP': 'EXPIRED OTP',
  // ---------------- not found fields ------------------
  '400_NOT_FOUND_USER': 'USER NOT FOUND',
  // ---------------- not found fields ------------------
  '400_INVALID_TOKEN': 'INVALID TOKEN',
};

const errMessageTypes = {
  notFound: 'NOT_FOUND',
  badRequest: 'BAD_REQUEST',
  badRequestEmptyField: 'BAD_REQUEST_EMPTY_FIELD', // general
  badRequestNotExist: 'BAD_REQUEST_NOT_EXIST', // general
  badRequestExistData: 'BAD_REQUEST_EXIST_DATA', // general
  badRequestWrongField: 'BAD_REQUEST_WRONG_FIELD', // general
  badRequestWrongDataType: 'BAD_REQUEST_DATA_TYPE', // general
  badRequestNotNumber: 'BAD_REQUEST_NOT_NUMBER', // general
  unauthorized: 'UNAUTHORIZED',
  wrongAuth: 'WRONG_AUTH',
  expiredOtp: 'EXPIRED_OTP',
  exist: 'EXIST',
  invalidToken: 'INVALID_TOKEN',
};

const successMessageTypes = {
  createData: 'CREATE_DATA',
  updateData: 'UPDATE_DATA',
  deleteData: 'DELETE_DATA',
  findAll: 'FIND_ALL',
  findDetail: 'FIND_DETAIL',
  register: 'REGISTER',
  login: 'LOGIN',
  userInfo: 'USER_INFO',
  resendOtp: 'RESEND_OTP',
  confirmOtp: 'CONFIRM_OTP',
  forgotPassword: 'FORGOT_PASSWORD',
  resetPassword: 'RESET_PASSWORD',
  resetPassword: 'RESET_PASSWORD',
};

const otpType = {
  register: 'REGISTER',
  resetPassword: 'RESET_PASSWORD',
};

const otpStatus = {
  confirmed: 'CONFIRMED',
  notConfirmed: 'NOT_CONFIRMED',
};

const excludeColumns = ['updatedAt', 'createdAt', 'createdBy', 'updatedBy'];

module.exports = {
  errors,
  errSequelize,
  errMessageTypes,
  successMessageTypes,
  errJwt,
  otpType,
  otpStatus,
  excludeColumns,
};
