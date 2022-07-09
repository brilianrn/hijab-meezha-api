const { verifyToken } = require('../../utils/jwt');
const { User } = require('../../models');

const authentication = (req, res, next) => {
  try {
    let { id, email } = verifyToken(req.headers.access_token);

    User.findOne({ where: { id, email } })
      .then((data) => {
        if (data) {
          req.currentUser = { id: data.id, email: data.email, role: data.role };
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
  } catch (error) {
    next({
      name: 'notLogin',
      code: 401,
    });
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
