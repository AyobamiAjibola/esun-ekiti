import path from 'path';

import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { createNamespace } from 'cls-hooked';

import { appCommonTypes } from '../@types/app-common';
import DatabaseEnv = appCommonTypes.DatabaseEnv;
import settings from './settings';


const env = process.env.NODE_ENV as DatabaseEnv;

const postgresConfig = settings.postgres[env];
const db = "esun1"
const models = path.resolve(__dirname, '../models');

if (db) {
    const namespace = createNamespace(db);

    Sequelize.useCLS(namespace);
}

const sequelize = new Sequelize({
    host: postgresConfig.host || '127.0.0.1',
    username: postgresConfig.username || 'postgres',
    password: postgresConfig.password || 'admin',
    port: +(<string>postgresConfig.port) || 5432,
    database: postgresConfig.database || 'esun1',
    models: [models],
    dialect: <Dialect>postgresConfig.dialect || 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
      underscored: true,
    },
  });

  const database = {
    init: async () => sequelize.authenticate(),
    sequelize,
  };

  export default database;