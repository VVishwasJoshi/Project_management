const JWT = require("jsonwebtoken")
const secret = "$umukha@123";

function createTokenForUser(user) {
  const payload = {
    _id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  verifyToken,
};
