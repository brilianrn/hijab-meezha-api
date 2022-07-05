const bcrypt = require('bcryptjs');

const hashPassword = (inputPass) => {
  const salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync('' + inputPass, salt);

  return hash;
};

const comparePassword = (inputPass, passDb) => {
  return bcrypt.compareSync(inputPass, passDb);
};

module.exports = { hashPassword, comparePassword };
