const route = require('express').Router();
const {
  CreateAddress,
  UpdateAddress,
  FindAllAddress,
  FindOneAddress,
  DeleteAddress,
} = require('../../controllers/users');
const { UserAuthentication } = require('../../middlewares/auth');
const {
  createAddressChecking,
  updateAddressChecking,
  paramIdAddressChecking,
} = require('../../middlewares/users/address');

route.get('/', UserAuthentication, FindAllAddress);
route.get('/:id', UserAuthentication, paramIdAddressChecking, FindOneAddress);
route.post('/', UserAuthentication, createAddressChecking, CreateAddress);
route.put('/:id', UserAuthentication, updateAddressChecking, UpdateAddress);
route.delete('/:id', UserAuthentication, paramIdAddressChecking, DeleteAddress);

module.exports = route;
