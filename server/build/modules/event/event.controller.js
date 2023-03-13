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
const eventValidator = __importStar(require("./event.validators"));
const eventServices = __importStar(require("./event.services"));
const new_event = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = eventValidator.postEvent(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        const newEvent = yield eventServices.newEvent(req.body, next);
        newEvent &&
            res.status(response_codes_1.RESOURCE_CREATED).json({
                status: "success",
                message: "Event created successfully",
                data: { newEvent },
            });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_event = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = eventValidator.updEvent(req.body);
        if (validate.error) {
            return next(new appError_1.default(validate.error.message, response_codes_1.BAD_REQUEST));
        }
        yield eventServices.updEvent(req.body, next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Event updated successfully",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const upd_event_img = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eventServices.updEventImg(next, req);
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
const single_event = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleEvent = yield eventServices.readSingleEvent(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Fetch successful",
            data: { singleEvent },
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const fetch_event = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield eventServices.fetchEvents(next, req);
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
const fetch_event_client = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield eventServices.fetchEventClient(next, req);
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
const delete_event = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eventServices.delEvent(next, req);
        return res.status(response_codes_1.OK).json({
            status: "success",
            message: "Event successfully deleted",
            data: null,
        });
    }
    catch (error) {
        return next(new appError_1.default(error.message, response_codes_1.BAD_REQUEST));
    }
});
const delete_event_image = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eventServices.delete_single_image(req, next);
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
    new_event,
    upd_event,
    single_event,
    fetch_event,
    delete_event,
    upd_event_img,
    fetch_event_client,
    delete_event_image
};
//# sourceMappingURL=event.controller.js.map