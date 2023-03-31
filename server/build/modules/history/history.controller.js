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
const historyValidator = __importStar(require("./history.validators"));
const historyServices = __importStar(require("./history.services"));
const history = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = historyValidator.postHistory(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const newHistory = yield historyServices.history(req.body, next, req);
        newHistory &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Created successfully",
                data: { newHistory },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_history = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = historyValidator.updHistory(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield historyServices.updHistory(req.body, next, req);
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
const upd_history_img = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield historyServices.updHistoryImg(req.body, next, req);
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
const fetch_history = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield historyServices.fetchHistory(next, req);
        const info = result === null || result === void 0 ? void 0 : result.result;
        const info2 = result === null || result === void 0 ? void 0 : result.fetch;
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { info, info2 },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const single_history = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleHistory = yield historyServices.readSingleHistory(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleHistory },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_history = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const del = yield historyServices.delHistory(next, req);
        del &&
            res.status(response_codes_1.OK).json({
                status: "success",
                message: "History successfully deleted",
                data: null,
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_history_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield historyServices.delete_single_image(req);
        res.status(response_codes_1.OK).json({
            status: "success",
            message: "History successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
exports.default = {
    history,
    upd_history,
    fetch_history,
    single_history,
    delete_history,
    upd_history_img,
    delete_history_image
};
//# sourceMappingURL=history.controller.js.map