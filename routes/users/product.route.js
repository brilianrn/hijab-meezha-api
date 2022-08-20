const route = require('express').Router();
const {
  FindAllProduct,
  FindDetailProduct,
} = require('../../controllers/products/products');

route.get('/', FindAllProduct);
route.get('/:id', FindDetailProduct);

module.exports = route;
