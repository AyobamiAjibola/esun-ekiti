"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBcryptPassword = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = (p) => bcrypt_1.default.hashSync(p, 10);
exports.hash = hash;
const verifyBcryptPassword = (password, hashes) => bcrypt_1.default.compareSync(password, hashes);
exports.verifyBcryptPassword = verifyBcryptPassword;
//# sourceMappingURL=auth.js.map