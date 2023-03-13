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
exports.jwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("../sequelize/models"));
const { UserToken } = models_1.default;
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
const jwtGenerator = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            id: user.id,
            phone_num: user.phone_num,
            role: user.user_type,
        };
        const token = jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`, { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME_LIMIT });
        const info = {
            role: user.user_type,
            id: user.id
        };
        const refreshToken = jsonwebtoken_1.default.sign(info, `${process.env.REFRESH_TOKEN_PUBLIC_KEY}`, { expiresIn: process.env.JWT_REFRESH_TOKEN_TIME_LIMIT });
        const userToken = yield UserToken.findOne({ where: { UserId: user.id } });
        if (userToken)
            yield UserToken.destroy({ where: { UserId: user.id } });
        const expired = new Date();
        expired.setDate(expired.getDate() + 7);
        yield UserToken.create({
            UserId: user.id,
            token: refreshToken,
            expired_at: expired
        });
        return Promise.resolve({ token, refreshToken });
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.jwtGenerator = jwtGenerator;
//# sourceMappingURL=jwtGenerator.js.map