const express = require('express');
const route = express.Router();
const adminRoute = require('../routes/admin.route');
const userRoute = require('../routes/user.route');
const commonRoute = require('../routes/common.route');
const productRoute = require('../routes/product.route');
const unknownEndpoint = require('../middlewares/error-hanlders/unknownEndpoint');

route.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to Hijab Meezha!',
    description: 'Success Hijab Meezha API',
  });
});

route.use('/admin', adminRoute);
route.use('/common', commonRoute);
route.use('/user', userRoute);
route.use('/product', productRoute);
route.use(unknownEndpoint);

module.exports = route;
