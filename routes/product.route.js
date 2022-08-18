const route = require('express').Router();
const { CreateProductCategory } = require('../controllers/products/categories');
const {
  adminAuthentication,
  superAdminAuthorization,
} = require('../middlewares/authorization');

route.use(adminAuthentication, superAdminAuthorization);

route.post('/category/create', CreateProductCategory);

module.exports = route;
