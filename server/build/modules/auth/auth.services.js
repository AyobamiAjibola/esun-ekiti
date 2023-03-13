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
exports.logout = exports.refreshToks = exports.adminLogin = void 0;
const jwtGenerator_1 = require("../../utils/jwtGenerator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const auth_1 = require("../../utils/auth");
const verifyRefreshToken_1 = require("../../utils/verifyRefreshToken");
const { Admin } = models_1.default;
const { sequelize } = models_1.default;
const { UserToken } = models_1.default;
const adminLogin = (res, body, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { phone_num, password } = body;
        const user = yield Admin.findOne({ where: { phone_num } }, { transaction });
        if (!user || user === null) {
            return next(new appError_1.default("Invalid phone number or password", response_codes_1.BAD_REQUEST));
        }
        const isMatch = (0, auth_1.verifyBcryptPassword)(password, user.password);
        if (!isMatch) {
            return next(new appError_1.default("Invalid phone number or password", response_codes_1.BAD_REQUEST));
        }
        yield transaction.commit();
        const { token, refreshToken } = yield (0, jwtGenerator_1.jwtGenerator)(user.dataValues);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return { token };
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.adminLogin = adminLogin;
const refreshToks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, verifyRefreshToken_1.verifyRefreshToken)(req.cookies['refreshToken'], req, next);
        if (req.data === undefined) {
            return next(new appError_1.default("Access Denied: Invalid token", 403));
        }
        const payload = {
            id: req.data.id,
            role: req.data.role
        };
        const token = jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`, { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT });
        res.status(200).json({ token });
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.refreshToks = refreshToks;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['refreshToken'];
        if (token) {
            yield UserToken.destroy({ where: { token: token } });
            res.cookie('refreshToken', '', {
                httpOnly: true,
                maxAge: 0
            });
        }
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.services.js.map