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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_codes_1 = require("../constants/response-codes");
const appError_1 = __importDefault(require("../utils/appError"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.header && ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        if (!token) {
            return next(new appError_1.default("You are not logged in, please log in to get access", response_codes_1.FORBIDDEN));
        }
        const tokenDetails = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        if (tokenDetails === undefined) {
            return next(new appError_1.default("Access Denied: Invalid token data", response_codes_1.FORBIDDEN));
        }
        req.data = tokenDetails;
        next();
    }
    catch (err) {
        return next(new appError_1.default("Access Denied: Invalid token", response_codes_1.FORBIDDEN));
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map