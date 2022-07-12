const { verifyToken } = require('../../utils/jwt');
const { User } = require('../../models');
const { errors } = require('../../constants');

const authentication = async (req, res, next) => {
  try {
    const authHeader =
      req.headers && req.headers.authorization
        ? req.headers.authorization
        : null;

    if (!authHeader) {
      return next({ name: errors[401] });
    }

    const matchToken = authHeader.split(' ');
    const { id, email } = verifyToken(matchToken[1]);
    const opt = {
      where: { id, email },
    };
    const data = await User.findOne(opt);
    if (!data && !data.is_active) return next({ name: errors[401] });
    req.currentUser = { id: data.id, email: data.email };
    next();
  } catch (error) {
    return next(error);
  }
};

const authorization = (req, res, next) => {
  User.findByPk(+req.currentUser.id)
    .then((data) => {
      if (data && data.role === 'Admin') {
        next();
      } else {
        throw new Error({
          name: 'wrongAuth',
          code: 401,
        });
      }
    })
    .catch((err) => {
      next({
        name: 'wrongAuth',
        code: 401,
      });
    });
};

module.exports = { authentication, authorization };
