const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

async function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });
}

async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  authenticate, Response, hash, verifyHash, generateToken, verifyToken,
};
