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
exports.validation_computer = exports.validation_phone = exports.validation = void 0;
const response_codes_1 = require("../constants/response-codes");
const models_1 = __importDefault(require("../sequelize/models"));
const appError_1 = __importDefault(require("../utils/appError"));
const Post_image = models_1.default.Picture;
const Phone_image = models_1.default.PhonePicture;
const Computer_image = models_1.default.ComputerPicture;
const validation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield Post_image.findOne({ where: { postId: req.params.id } });
        const check_img_len = fetch.dataValues.image.length;
        if (check_img_len === 2) {
            return next(new appError_1.default("Maximum number of image exceeded", response_codes_1.BAD_REQUEST));
        }
    }
    catch (error) {
        res.send(error.message);
    }
    next();
});
exports.validation = validation;
const validation_phone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield Phone_image.findOne({ where: { PhoneId: req.params.id } });
        const check_img_len = fetch.dataValues.image.length;
        if (check_img_len === 2) {
            return next(new appError_1.default("Maximum number of image exceeded", response_codes_1.BAD_REQUEST));
        }
    }
    catch (error) {
        res.send(error.message);
    }
    next();
});
exports.validation_phone = validation_phone;
const validation_computer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield Computer_image.findOne({ where: { ComputerId: req.params.id } });
        const check_img_len = fetch.dataValues.image.length;
        if (check_img_len === 2) {
            return next(new appError_1.default("Maximum number of image exceeded", response_codes_1.BAD_REQUEST));
        }
    }
    catch (error) {
        res.send(error.message);
    }
    next();
});
exports.validation_computer = validation_computer;
//# sourceMappingURL=validation.js.map