const route = require('express').Router();
const {
  CreateCart,
  FindAllUserCart,
  UpdateCart,
  DeleteProductCart,
} = require('../../controllers/products/carts');
const { UserAuthentication } = require('../../middlewares/auth');

route.get('/', UserAuthentication, FindAllUserCart);
route.post('/', UserAuthentication, CreateCart);
route.put('/', UserAuthentication, UpdateCart);
route.delete('/:id', UserAuthentication, DeleteProductCart);

module.exports = route;
