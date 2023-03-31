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
const councilValidator = __importStar(require("./council.validators"));
const councilServices = __importStar(require("./council.services"));
const new_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.postOba(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const newObas = yield councilServices.newOba(next, req);
        newObas &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Oba created successfully",
                data: { newObas },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.updOba(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield councilServices.updOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Oba updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const single_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleOba = yield councilServices.readSingleOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleOba }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield councilServices.fetchObas(next, req);
        const info = resource === null || resource === void 0 ? void 0 : resource.result;
        const bio = resource === null || resource === void 0 ? void 0 : resource.array;
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            result: { info, bio }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield councilServices.delOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Oba successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const new_olori = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.postOlori(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const newOlori = yield councilServices.newOlori(next, req);
        newOlori &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Olori created successfully",
                data: { newOlori },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_olori = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.updOlori(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield councilServices.updOlori(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Olori updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_olori = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield councilServices.fetchOlori(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            result
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_olori = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield councilServices.delOlori(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Olori successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const new_chief = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.postChief(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const new_biz = yield councilServices.newChief(next, req);
        new_biz &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Chief created successfully",
                data: { new_biz },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_chief = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.updChief(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield councilServices.updChief(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Chief updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_chief_img = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield councilServices.updChiefImg(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Chief updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const single_chief = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleChief = yield councilServices.readSingleChief(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleChief },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_chief = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield councilServices.fetchChiefs(next, req);
        return res.status(response_codes_1.OK).json({
            result
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_chief_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield councilServices.fetchChiefsAdmin(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            result,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_chief = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield councilServices.delChief(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Chief successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const new_past_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.postPastOba(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const new_pastOba = yield councilServices.newPastOba(next, req);
        new_pastOba &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Oba created successfully",
                data: { new_pastOba },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_past_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = councilValidator.updPastOba(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield councilServices.updPastOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Oba updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const single_past_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singlePastOba = yield councilServices.readSinglePastOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singlePastOba },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_past_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield councilServices.fetchPastObas(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            result,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_past_oba_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield councilServices.fetchPastObaAdmin(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            result
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_past_oba = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield councilServices.delPastOba(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Oba successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
exports.default = {
    new_oba,
    upd_oba,
    single_oba,
    fetch_oba,
    delete_oba,
    new_olori,
    upd_olori,
    fetch_olori,
    delete_olori,
    new_chief,
    upd_chief,
    single_chief,
    fetch_chief,
    delete_chief,
    new_past_oba,
    upd_past_oba,
    single_past_oba,
    fetch_past_oba,
    delete_past_oba,
    upd_chief_img,
    fetch_past_oba_admin,
    fetch_chief_admin
};
//# sourceMappingURL=council.controller.js.map