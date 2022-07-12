const { errMessageTypes, successMessageTypes } = require('../constants');

const errorMessages = (type, props) => {
  switch (type) {
    case errMessageTypes.notFound:
      return 'Data not found!';
    case errMessageTypes.badRequest:
      return `${props} cannot be empty!`;
    case errMessageTypes.wrongAuth:
      return `Invalid email or password!`;
    case errMessageTypes.unauthorized:
      return `Invalid token!`;
    default:
      return props;
  }
};

const successMessages = (type, props) => {
  switch (type) {
    case successMessageTypes.userInfo:
      return 'Get user info successfully';
    case successMessageTypes.register:
      return 'Thank you! Your registration form has been successfully sent. We will contact you very soon!';
    case successMessageTypes.login:
      return 'You logged in successfully';
    default:
      return props;
  }
};

module.exports = { errorMessages, successMessages };
