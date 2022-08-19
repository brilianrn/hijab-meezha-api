const route = require('express').Router();
const {
  CreateProductCategory,
  DeleteProductCategory,
  FindAllProductCategory,
  FindAllProductCategoryForDropDown,
  FindDetailProductCategory,
  UpdateCategory,
} = require('../../controllers/products/categories');
const {
  FindAllProductSizeForDropDown,
  FindAllProductSize,
  FindDetailProductSize,
  CreateProductSize,
  DeleteProductSize,
  UpdateProductSize,
} = require('../../controllers/products/sizes');
const {
  FindAllProductTax,
  FindAllProductTaxForDropDown,
  FindDetailProductTax,
  CreateProductTax,
  DeleteProductTax,
  UpdateProductTax,
} = require('../../controllers/products/taxes');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');

route.use(AdminAuthentication);
route.use(AdminAuthorization('Super Admin', 'Admin'));

route.get('/category', FindAllProductCategory);
route.get('/category/dropdown', FindAllProductCategoryForDropDown);
route.get('/category/:id', FindDetailProductCategory);

route.get('/size', FindAllProductSize);
route.get('/size/dropdown', FindAllProductSizeForDropDown);
route.get('/size/:id', FindDetailProductSize);

route.get('/tax', FindAllProductTax);
route.get('/tax/dropdown', FindAllProductTaxForDropDown);
route.get('/tax/:id', FindDetailProductTax);

route.use(AdminAuthorization('Super Admin'));

route.post('/category', CreateProductCategory);
route.delete('/category/:id', DeleteProductCategory);
route.put('/category/:id', UpdateCategory);

route.post('/size', CreateProductSize);
route.delete('/size/:id', DeleteProductSize);
route.put('/size/:id', UpdateProductSize);

route.post('/tax', CreateProductTax);
route.delete('/tax/:id', DeleteProductTax);
route.put('/tax/:id', UpdateProductTax);

module.exports = route;
