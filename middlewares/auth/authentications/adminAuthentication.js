const { verifyToken } = require('../../../utils/jwt');
const { Admin, Role } = require('../../../models');
const { errors } = require('../../../constants');

const AdminAuthentication = async (req, _, next) => {
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

module.exports = { AdminAuthentication };
