const express = require('express');
const route = express.Router();
const userRoute = require('../routes/user.route');

route.get('/', (_req, res) => {
  res.status(200).json({ messgae: 'success hijab meezha api' });
});

route.use('/user', userRoute);

module.exports = route;
