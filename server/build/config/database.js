"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
const cls_hooked_1 = require("cls-hooked");
const settings_1 = __importDefault(require("./settings"));
const env = process.env.NODE_ENV;
const postgresConfig = settings_1.default.postgres[env];
const db = "esun1";
const models = path_1.default.resolve(__dirname, '../models');
if (db) {
    const namespace = (0, cls_hooked_1.createNamespace)(db);
    sequelize_typescript_1.Sequelize.useCLS(namespace);
}
const sequelize = new sequelize_typescript_1.Sequelize({
    host: postgresConfig.host,
    username: postgresConfig.username,
    password: postgresConfig.password,
    port: +postgresConfig.port,
    database: postgresConfig.database,
    models: [models],
    dialect: postgresConfig.dialect,
    logging: false,
    define: {
        freezeTableName: true,
        underscored: true,
    },
});
const database = {
    init: () => __awaiter(void 0, void 0, void 0, function* () { return sequelize.authenticate(); }),
    sequelize,
};
exports.default = database;
//# sourceMappingURL=database.js.map