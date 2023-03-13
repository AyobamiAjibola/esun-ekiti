"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updNews = exports.postNews = void 0;
const joi_1 = __importDefault(require("joi"));
const postNews = (data) => {
    const schema = joi_1.default.object().keys({
        news: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.postNews = postNews;
const updNews = (data) => {
    const schema = joi_1.default.object().keys({
        news: joi_1.default.string(),
        title: joi_1.default.string(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.updNews = updNews;
//# sourceMappingURL=news.validators.js.map