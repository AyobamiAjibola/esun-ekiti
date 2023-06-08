import {appCommonTypes} from '../@types/app-common';
import AppSettings = appCommonTypes.AppSettings;

import 'dotenv/config';

const settings: AppSettings = {

  service: {
    env: <string>process.env.NODE_ENV,
    port: <string>process.env.PORT,
    apiRoot: <string>process.env.ROOT_API,
  },
  postgres: {
    development: {
      database: <string>process.env.SQL_DEV_DB_NAME,
      dialect: <string>process.env.SQL_DB_DIALECT,
      host: <string>process.env.SQL_DB_HOST,
      username: <string>process.env.SQL_DB_USERNAME,
      password: <string>process.env.SQL_DB_PASSWORD,
      port: <string>process.env.SQL_DB_PORT,
    },
    production: {
      database: <string>process.env.SQL_PROD_DB_NAME,
      dialect: <string>process.env.SQL_DB_DIALECT,
      host: <string>process.env.SQL_DB_HOST,
      username: <string>process.env.SQL_DB_USERNAME,
      password: <string>process.env.SQL_DB_PASSWORD,
      port: <string>process.env.SQL_DB_PORT,
    },
    test: {
      database: <string>process.env.SQL_TEST_DB_NAME,
      dialect: <string>process.env.SQL_DB_DIALECT,
      host: <string>process.env.SQL_DB_HOST,
      username: <string>process.env.SQL_DB_USERNAME,
      password: <string>process.env.SQL_DB_PASSWORD,
      port: <string>process.env.SQL_DB_PORT,
    },
  },
};

export default settings;
