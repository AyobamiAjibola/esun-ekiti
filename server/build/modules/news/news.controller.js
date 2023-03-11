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
const newsValidator = __importStar(require("./news.validators"));
const newsServices = __importStar(require("./news.services"));
const new_news = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = newsValidator.postNews(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const news = yield newsServices.newNews(req.body, next, req);
        news &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "News created successfully",
                data: { news },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_news = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = newsValidator.updNews(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield newsServices.updNews(req.body, next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "News updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_news_img = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield newsServices.updNewsImg(req.body, next, req);
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
const single_news = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleNews = yield newsServices.readSingleNews(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleNews },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_news_active = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield newsServices.fetchNewsActive(next, req);
        const res1 = result === null || result === void 0 ? void 0 : result.result;
        const res2 = result === null || result === void 0 ? void 0 : result.array;
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { res1, res2 }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_news_limit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield newsServices.fetchNewsLimit(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { result },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_news_all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield newsServices.fetchNewsAll(next, req);
        const res1 = result === null || result === void 0 ? void 0 : result.result;
        const res2 = result === null || result === void 0 ? void 0 : result.array;
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { res1, res2 },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_news = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield newsServices.delNews(next, req);
        res.status(response_codes_1.OK).json({
            status: "success",
            message: "News successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_news_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield newsServices.delete_single_image(req);
        res.status(response_codes_1.OK).json({
            status: "success",
            message: "Image successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const valid_news = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield newsServices.updValid(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Updated News status successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
exports.default = {
    new_news,
    upd_news,
    single_news,
    fetch_news_active,
    delete_news,
    valid_news,
    fetch_news_all,
    upd_news_img,
    delete_news_image,
    fetch_news_limit
};
//# sourceMappingURL=news.controller.js.map