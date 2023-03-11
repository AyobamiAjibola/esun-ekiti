"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const auth_services_1 = require("./auth.services");
const authValidator = __importStar(require("./auth.validator"));
const login_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = authValidator.authLogin(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const fetch = yield (0, auth_services_1.adminLogin)(res, req.body, next);
        const token = fetch === null || fetch === void 0 ? void 0 : fetch.token;
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Login was successful.",
            token
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const login_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = authValidator.authLogin(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const user = yield (0, auth_services_1.userLogin)(res, req.body, next);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Login was successful.",
            data: {
                id: user.id,
                isAdmin: user.isAdmin,
                user_type: user.user_type
            }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const new_access_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_services_1.refreshToks)(req, res, next);
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const logout_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_services_1.logout)(req, res, next);
        res.status(200).json({
            error: false,
            message: "Logged Out Successfully"
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
exports.default = {
    login_admin,
    login_user,
    new_access_token,
    logout_user
};
//# sourceMappingURL=auth.controller.js.map