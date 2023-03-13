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
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const response_codes_1 = require("../constants/response-codes");
const models_1 = __importDefault(require("../sequelize/models"));
const appError_1 = __importDefault(require("./appError"));
const { UserToken } = models_1.default;
const verifyRefreshToken = (refreshToken, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!refreshToken)
            return new appError_1.default("Invalid", response_codes_1.UNAUTHORIZED);
        ;
        const fetch = yield UserToken.findOne({ where: { token: refreshToken } });
        if (!fetch) {
            return new appError_1.default("Invalid refresh token", response_codes_1.BAD_REQUEST);
        }
        const data = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_PUBLIC_KEY);
        const db_token = yield UserToken
            .findOne({ where: {
                UserId: data.id,
                expired_at: { [sequelize_1.Op.gte]: new Date() }
            }
        });
        if (!db_token) {
            return new appError_1.default("Invalid refresh token", response_codes_1.BAD_REQUEST);
        }
        req.data = data;
    }
    catch (error) {
        return new appError_1.default(error, response_codes_1.BAD_REQUEST);
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=verifyRefreshToken.js.map