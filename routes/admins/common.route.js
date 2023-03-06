const route = require('express').Router();
const {
  CreateRole,
  FindAllRole,
  FindDetailRole,
  UpdateRole,
  DeleteRole,
  FindAllForDropDown,
  CreateStatus,
} = require('../../controllers/commons');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');
const { createStatusChecking } = require('../../middlewares/commons/status');

route.use(AdminAuthentication);
route.use(AdminAuthorization('Super Admin'));

route.get('/role', FindAllRole);
route.get('/role/dropdown', FindAllForDropDown);
route.get('/role/:id', FindDetailRole);
route.patch('/role/:id', UpdateRole);
route.delete('/role/:id', DeleteRole);
route.post('/role/create', CreateRole);

route.post('/status', createStatusChecking, CreateStatus);

module.exports = route;
