require('dotenv').config();

const {
  DB_DIALECT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
} = process.env;

module.exports = {
  "username": DB_USER,
  "password": DB_PASS,
  "database": DB_NAME,
  "host": DB_HOST,
  "port": DB_PORT,
  "dialect": DB_DIALECT,
  "operatorsAliases": 0
};
