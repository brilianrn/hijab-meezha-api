const express = require('express');
const route = express.Router();
const adminsRoute = require('./admins');
const userRoute = require('./users');
const unknownEndpoint = require('../middlewares/error-hanlders/unknownEndpoint');

route.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to Hijab Meezha!',
    description: 'Success Hijab Meezha API',
  });
});

route.use('/admin', adminsRoute);
route.use('/user', userRoute);

route.use(unknownEndpoint);

module.exports = route;
