const { verifyToken } = require('../../utils/jwt');
const { User, Admin, Role } = require('../../models');
const { errors } = require('../../constants');

const authentication = async (req, _, next) => {
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
    if (!data && !data?.is_active) return next({ name: errors[401] });
    req.currentUser = { id: data.id, email: data.email };
    next();
  } catch (error) {
    return next(error);
  }
};

const adminAuthentication = async (req, _, next) => {
  try {
    const authHeader =
      req.headers && req.headers.authorization
        ? req.headers.authorization
        : null;

    if (!authHeader) return next({ name: errors[401] });

    const matchToken = authHeader.split(' ');
    const { id, email } = verifyToken(matchToken[1]);
    const opt = {
      where: { id, email },
      include: [{ model: Role, attributes: ['id', 'name', 'code'] }],
    };
    const data = await Admin.findOne(opt);
    if (!data && !data?.isActive) return next({ name: errors[401] });
    req.currentAdmin = { id: data.id, email: data.email, role: data.Role.name };
    next();
  } catch (error) {
    return next(error);
  }
};

const superAdminAuthorization = async (req, _, next) => {
  const { id, email, role } = req.currentAdmin;

  if (!id && !email && !role) return next({ name: errors[401] });

  if (role === 'Super Admin') next();
  else return next({ name: errors[401] });
};

module.exports = {
  authentication,
  superAdminAuthorization,
  adminAuthentication,
};
