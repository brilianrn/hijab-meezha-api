const { errMessageTypes, successMessageTypes } = require('../constants');

const errorMessages = (type, props) => {
  switch (type) {
    case errMessageTypes.notFound:
      return 'Data not found!';
    default:
      return props;
  }
};

const successMessages = (type, props) => {
  switch (type) {
    case successMessageTypes.register:
      return 'Thank you! Your registration form has been successfully sent. We will contact you very soon!';
    default:
      return props;
  }
};

module.exports = { errorMessages, successMessages };
