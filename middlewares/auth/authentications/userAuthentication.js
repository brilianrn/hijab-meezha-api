const { verifyToken } = require('../../../utils/jwt');
const { User } = require('../../../models');
const { errors } = require('../../../constants');

const UserAuthentication = async (req, _, next) => {
  try {
    const authHeader =
      req.headers && req.headers.authorization
        ? req.headers.authorization
        : null;

    if (!authHeader) return next({ name: errors[401] });

    const matchToken = authHeader.split(' ');
    const { id, email } = verifyToken(matchToken[1]);
    const opt = { where: { id, email } };
    const data = await User.findOne(opt);

    if (!data || !data.isActive) return next({ name: errors[401] });

    req.currentUser = { id: data.id, email: data.email };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { UserAuthentication };
