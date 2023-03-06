const route = require('express').Router();
const {
  CreateOrder,
  FindAllUserOrders,
  FindDetailOrder,
} = require('../../controllers/products/orders');
const { UserAuthentication } = require('../../middlewares/auth');
const {
  createOrderChecking,
  paramIdOrderChecking,
} = require('../../middlewares/products/order');

route.get('/', UserAuthentication, FindAllUserOrders);
route.get('/:id', UserAuthentication, paramIdOrderChecking, FindDetailOrder);
route.post('/', UserAuthentication, createOrderChecking, CreateOrder);

module.exports = route;
