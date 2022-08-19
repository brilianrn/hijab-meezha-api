const route = require('express').Router();
const {
  CreateProductCategory,
  DeleteProductCategory,
  FindAllProductCategory,
  FindAllProductCategoryForDropDown,
  FindDetailProductCategory,
  UpdateCategory,
} = require('../controllers/products/categories');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../middlewares/auth');

route.use(AdminAuthentication);

route.get('/category/dropdown', FindAllProductCategoryForDropDown);

route.use(AdminAuthorization('Super Admin', 'Admin'));

route.get('/category', FindAllProductCategory);
route.get('/category/:id', FindDetailProductCategory);

route.use(AdminAuthorization('Super Admin'));

route.post('/category', CreateProductCategory);
route.delete('/category/:id', DeleteProductCategory);
route.put('/category/:id', UpdateCategory);

module.exports = route;
