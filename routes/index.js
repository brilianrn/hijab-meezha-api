const express = require('express');
const route = express.Router();
const userRoute = require('../routes/user.route');

route.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to Hijab Meezha!',
    description: 'Success hijab meezha api',
  });
});

route.use('/user', userRoute);

module.exports = route;
