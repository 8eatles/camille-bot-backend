// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = require('dotenv').config();
const database = require('./database');

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  port: parseInt(process.env.SERVICE_PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  database,
  api: {
    prefix: '/api',
  },
  bcrypt: {
    salt: null,
    nRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn:
      parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_SEC, 10) || 3600,
    refreshTokenExpiresIn:
      parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_SEC, 10) || 1209600,
  },
};

module.exports = config;
