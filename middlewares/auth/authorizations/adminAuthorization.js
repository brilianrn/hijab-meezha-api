const { errors } = require('../../../constants');

module.exports = (...roles) => {
  return (req, _, next) => {
    const { id, email, role } = req.currentAdmin;

    if (!id && !email && !role) return next({ name: errors[401] });

    if (roles.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        if (role.includes(roles[i])) return next();
      }
    }

    return next({ name: errors[401] });
  };
};
