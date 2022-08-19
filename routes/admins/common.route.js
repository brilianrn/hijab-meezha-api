const route = require('express').Router();
const {
  CreateRole,
  FindAllRole,
  FindDetailRole,
  UpdateRole,
  DeleteRole,
  FindAllForDropDown,
} = require('../../controllers/commons');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');

route.use(AdminAuthentication);
route.use(AdminAuthorization('Super Admin'));

route.get('/role', FindAllRole);
route.get('/role/dropdown', FindAllForDropDown);
route.get('/role/:id', FindDetailRole);
route.patch('/role/:id', UpdateRole);
route.delete('/role/:id', DeleteRole);
route.post('/role/create', CreateRole);

module.exports = route;
