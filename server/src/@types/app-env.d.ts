declare namespace NodeJS {
  interface ProcessEnv {
    //Environment configuration
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    ROOT_API: string;

    //Database configuration
    SQL_DB_HOST: string;
    SQL_DB_USERNAME: string;
    SQL_DB_PASSWORD: string;
    SQL_DB_PORT: string;
    SQL_DB_DIALECT: string;
    SQL_DEV_DB_NAME: string;
    SQL_PROD_DB_NAME: string;
    SQL_TEST_DB_NAME: string;

  }
}
