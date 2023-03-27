import { NextFunction, Request, Response } from 'express';
import { Attributes } from 'sequelize';

export declare namespace appCommonTypes {
  type DatabaseEnv = 'development' | 'production' | 'test';

  interface DatabaseConfig {
    host?: string;
    username?: string;
    password?: string;
    port?: string;
    dialect?: string;
    database?: string;
  }

  interface AppSettings {
    postgres: Record<DatabaseEnv, DatabaseConfig>;
  }

  interface HttpResponse<T> {
    message: string;
    code: number;
    timestamp?: string;
    result?: T | null;
    results?: T[];
    state?: any;
  }
}
