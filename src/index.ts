const router = require('express').Router();
const userRoute = require('./User/index.ts');

router.use('/user', userRoute);

module.exports = router;
