"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const response_codes_1 = require("../constants/response-codes");
const appError_1 = __importDefault(require("../utils/appError"));
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const fileFilter = (req, files, cb) => {
    if (files.mimetype === "image/jpeg" || files.mimetype === "image/jpg" || files.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new appError_1.default("One or more image types not supported", response_codes_1.BAD_REQUEST));
    }
};
exports.upload = (0, multer_1.default)({
    storage: fileStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 2 },
});
//# sourceMappingURL=multer.js.map