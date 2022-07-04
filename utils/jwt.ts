const jwt = require('jsonwebtoken');

const generateToken = (payload: string) => {
  const token: string = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (token: string) => {
  const decoded: string = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { generateToken, verifyToken };
