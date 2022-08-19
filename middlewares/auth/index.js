const {
  AdminAuthentication,
} = require('./authentications/adminAuthentication');
const { UserAuthentication } = require('./authentications/userAuthentication');
const AdminAuthorization = require('./authorizations/adminAuthorization');

module.exports = {
  AdminAuthentication,
  UserAuthentication,
  AdminAuthorization,
};
