const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, "../../../.env") });

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DEV,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.DB_PORT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_TEST,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.DB_PORT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_PROD,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.DB_PORT,
    // "dialectOptions": {
    //   "ssl": {
    //     "rejectUnauthorized": true
    //   }
    // }
  }
}
