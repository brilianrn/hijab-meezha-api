const route = require('express').Router();
const {
  FindAllProduct,
  FindDetailProduct,
} = require('../../controllers/products/products');
const {
  FindAllProductCategoryForDropDown,
} = require('../../controllers/products/categories');
const {
  FindAllProductSizeForDropDown,
} = require('../../controllers/products/sizes');

route.get('/', FindAllProduct);
route.get('/:id', FindDetailProduct);

route.get('/category/dropdown', FindAllProductCategoryForDropDown);

route.get('/size/dropdown', FindAllProductSizeForDropDown);

module.exports = route;
