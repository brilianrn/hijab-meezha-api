const errSequelize = {
  validationError: 'SEQUELIZEVALIDATIONERROR',
  dbError: 'SEQUELIZEDATABASEERROR',
  constraintError: 'SEQUELIZEUNIQUECONSTRAINTERROR',
};

const errors = {
  401: 'UNAUTHORIZED',
  404: 'NOT_FOUND',
};

const errMessageTypes = {
  notFound: 'NOT_FOUND',
};

const successMessageTypes = {
  register: 'REGISTER',
};

module.exports = { errors, errSequelize, errMessageTypes, successMessageTypes };
