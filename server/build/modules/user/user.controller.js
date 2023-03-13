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
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const usersServices = __importStar(require("./user.services"));
const { sequelize } = models_1.default;
const register_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAdminUser = yield usersServices.adminReg(req.body, next, req, res);
        return res.status(response_codes_1.RESOURCE_CREATED).json({
            status: "success",
            message: "User created successfully",
            data: { newAdminUser },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersServices.updateUser(req.body, next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const single_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleUser = yield usersServices.singleUser(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleUser }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersServices.deleteUser(next, req.params.id, req, res);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Account successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_users = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield usersServices.fetchUser(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { result },
        });
    }
    catch (error) {
        res.status(response_codes_1.BAD_REQUEST).send(error.message);
    }
});
exports.default = {
    register_admin,
    single_user,
    updateUser,
    delete_user,
    fetch_users,
};
//# sourceMappingURL=user.controller.js.map