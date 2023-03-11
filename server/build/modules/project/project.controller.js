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
const projectValidator = __importStar(require("./project.validators"));
const projectServices = __importStar(require("./project.services"));
const new_project = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = projectValidator.postProject(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const project = yield projectServices.newProject(req.body, next, req);
        project &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Project created successfully",
                data: { project },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_project = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = projectValidator.updProject(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield projectServices.updProject(req.body, next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Project updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_project_img = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield projectServices.updProjectImg(req.body, next, req);
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
const single_project = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleProject = yield projectServices.readSingleProject(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleProject },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_project = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield projectServices.fetchProject(next, req);
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
const fetch_project_client = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield projectServices.fetchProjectClient(next, req);
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
const fetch_project_limit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield projectServices.fetchProjectLimit(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { result }
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_project = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const del = yield projectServices.delProject(next, req);
        del &&
            res.status(response_codes_1.OK).json({
                status: "success",
                message: "Project successfully deleted",
                data: null,
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_project_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield projectServices.delete_single_image(req);
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
exports.default = {
    new_project,
    upd_project,
    single_project,
    fetch_project,
    delete_project,
    upd_project_img,
    delete_project_image,
    fetch_project_limit,
    fetch_project_client
};
//# sourceMappingURL=project.controller.js.map