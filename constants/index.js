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
  '400_EMPTY_EMAIL': 'EMAIL',
  '400_EMPTY_PASSWORD': 'PASSWORD',
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

module.exports = {
  errors,
  errSequelize,
  errMessageTypes,
  successMessageTypes,
  errJwt,
};
