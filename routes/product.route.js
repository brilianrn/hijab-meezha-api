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
  FindAllProductSizeForDropDown,
  FindAllProductSize,
  FindDetailProductSize,
  CreateProductSize,
  DeleteProductSize,
  UpdateProductSize,
} = require('../controllers/products/sizes');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../middlewares/auth');

route.use(AdminAuthentication);

route.get('/category/dropdown', FindAllProductCategoryForDropDown);
route.get('/size/dropdown', FindAllProductSizeForDropDown);

route.use(AdminAuthorization('Super Admin', 'Admin'));

route.get('/category', FindAllProductCategory);
route.get('/category/:id', FindDetailProductCategory);
route.get('/size', FindAllProductSize);
route.get('/size/:id', FindDetailProductSize);

route.use(AdminAuthorization('Super Admin'));

route.post('/category', CreateProductCategory);
route.delete('/category/:id', DeleteProductCategory);
route.put('/category/:id', UpdateCategory);
route.post('/size', CreateProductSize);
route.delete('/size/:id', DeleteProductSize);
route.put('/size/:id', UpdateProductSize);

module.exports = route;
