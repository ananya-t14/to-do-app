const bcrypt = require('bcryptjs');

function Response(statusCode, message, data = null) {
  return { statusCode, message, data };
}

async function hash(value) {
  return bcrypt.hash(value, 12);
}

async function authenticate(hashed) {
  return bcrypt.compare(process.env.TOKEN, hashed);
}

async function verifyHash(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

module.exports = {
  authenticate, Response, hash, verifyHash,
};
