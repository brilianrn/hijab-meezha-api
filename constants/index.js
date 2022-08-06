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
  // ---------------- wrong fields ------------------
  '400_WRONG_EMAIL': 'WRONG EMAIL',
  '400_WRONG_PASSWORD': 'WRONG PASSWORD',
};

const errMessageTypes = {
  notFound: 'NOT_FOUND',
  badRequest: 'BAD_REQUEST',
  unauthorized: 'UNAUTHORIZED',
  wrongAuth: 'WRONG_AUTH',
};

const successMessageTypes = {
  register: 'REGISTER',
  login: 'LOGIN',
  userInfo: 'USER_INFO',
};

const otpType = {
  register: 'REGISTER',
  resetPassword: 'RESET_PASSWORD',
};

module.exports = {
  errors,
  errSequelize,
  errMessageTypes,
  successMessageTypes,
  errJwt,
  otpType,
};
