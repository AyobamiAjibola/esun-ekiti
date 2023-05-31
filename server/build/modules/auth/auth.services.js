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
exports.cookie = exports.logout = exports.refreshToks = exports.adminLogin = void 0;
const jwtGenerator_1 = require("../../utils/jwtGenerator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const auth_1 = require("../../utils/auth");
const verifyRefreshToken_1 = require("../../utils/verifyRefreshToken");
const UserToken_1 = __importDefault(require("../../models/UserToken"));
const Admin_1 = __importDefault(require("../../models/Admin"));
const adminLogin = (body, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone_num, password } = body;
    const user = yield (Admin_1.default === null || Admin_1.default === void 0 ? void 0 : Admin_1.default.findOne({ where: { phone_num } }));
    if (!user || user === null) {
        return next(new appError_1.default("Invalid phone number or password", response_codes_1.BAD_REQUEST));
    }
    const isMatch = (0, auth_1.verifyBcryptPassword)(password, user.password);
    if (!isMatch) {
        return next(new appError_1.default("Invalid phone number or password", response_codes_1.BAD_REQUEST));
    }
    const { token, refreshToken } = yield (0, jwtGenerator_1.jwtGenerator)(user.dataValues);
    return { token, refreshToken };
});
exports.adminLogin = adminLogin;
const refreshToks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, verifyRefreshToken_1.verifyRefreshToken)(req.cookies['refreshToken'], req, next);
    if (req.data === undefined) {
        return next(new appError_1.default("Access Denied: Invalid token", 403));
    }
    const payload = {
        id: req.data.id,
        role: req.data.role
    };
    const token = jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`, { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT });
    console.log(token);
    res.status(200).json({ token });
});
exports.refreshToks = refreshToks;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['refreshToken'];
    if (token) {
        yield (UserToken_1.default === null || UserToken_1.default === void 0 ? void 0 : UserToken_1.default.destroy({ where: { token: token } }));
        res.cookie('refreshToken', '', {
            httpOnly: true,
            maxAge: 0
        });
    }
});
exports.logout = logout;
const cookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.headers.cookie;
    if (cookies) {
        const cookieArray = cookies.split(';');
        let refreshToken = null;
        for (const cookie of cookieArray) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'refreshToken') {
                refreshToken = value;
                break;
            }
        }
        return refreshToken;
    }
});
exports.cookie = cookie;
//# sourceMappingURL=auth.services.js.map