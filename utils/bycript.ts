const bcrypt = require('bcryptjs');

const hashPassword = (inputPass: string) => {
  const salt: string = bcrypt.genSaltSync(10),
    hash: string = bcrypt.hashSync('' + inputPass, salt);

  return hash;
};

const comparePassword = (inputPass: string, passDb: string) => {
  return bcrypt.compareSync(inputPass, passDb);
};

module.exports = { hashPassword, comparePassword };
