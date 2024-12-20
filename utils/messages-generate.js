const { errMessageTypes, successMessageTypes } = require('../constants');

const errorMessages = (type, props, description) => {
  switch (type) {
    case errMessageTypes.notFound:
      return 'Data not found!';
    case errMessageTypes.badRequest:
      if (props || description) return description || props;
      return `${props} cannot be empty!`;
    case errMessageTypes.badRequestEmptyField:
      return `${props} cannot be empty!`;
    case errMessageTypes.badRequestNotExist:
      return `${props} is not found!`;
    case errMessageTypes.badRequestExistData:
      return `${props} is already exist!`;
    case errMessageTypes.badRequestWrongDataType:
      return `${props} is invalid data type!`;
    case errMessageTypes.badRequestWrongField:
      return `${props} invalid field!`;
    case errMessageTypes.badRequestNotNumber:
      const msg = props.split('-');
      return `${msg[0]} must be ${msg[1] ? msg[1] + ' ' : ''}number!`;
    case errMessageTypes.wrongAuth:
      return `Invalid email or password!`;
    case errMessageTypes.unauthorized:
      return `Invalid token!`;
    case errMessageTypes.expiredOtp:
      return `OTP code was expired!`;
    case errMessageTypes.invalidToken:
      return 'Invalid token';
    case errMessageTypes.exist:
      return `${props}`;
    default:
      return props;
  }
};

const successMessages = (type, props) => {
  switch (type) {
    case successMessageTypes.userInfo:
      return 'Get user info successfully';
    case successMessageTypes.resendOtp:
      return 'Your verification code already sended to Your email';
    case successMessageTypes.register:
      return 'Thank you! Your registration form has been successfully. We already sent verification code to Your email!';
    case successMessageTypes.login:
      return 'You logged in successfully';
    case successMessageTypes.confirmOtp:
      return 'Your OTP is successfully confirmed!';
    case successMessageTypes.forgotPassword:
      return 'We already sent verification code to Your email!';
    case successMessageTypes.resetPassword:
      return 'Your password has been changed successfully!';
    case successMessageTypes.findAll:
      return `All of ${props} successfully obtained`;
    case successMessageTypes.findDetail:
      return `${props} successfully obtained`;
    case successMessageTypes.createData:
      return `${props} successfully created`;
    case successMessageTypes.updateData:
      return `${props} successfully updated`;
    case successMessageTypes.deleteData:
      return `${props} successfully deleted`;
    default:
      return props;
  }
};

module.exports = { errorMessages, successMessages };
