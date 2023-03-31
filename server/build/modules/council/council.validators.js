"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updOlori = exports.postOlori = exports.updPastOba = exports.postPastOba = exports.updChief = exports.postChief = exports.updOba = exports.postOba = void 0;
const joi_1 = __importDefault(require("joi"));
const postOba = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        bio: joi_1.default.string().required(),
        from: joi_1.default.string().required(),
        to: joi_1.default.string().required(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.postOba = postOba;
const updOba = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string(),
        bio: joi_1.default.string(),
        from: joi_1.default.string(),
        to: joi_1.default.string(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.updOba = updOba;
const postChief = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        bio: joi_1.default.string(),
        image: joi_1.default.any(),
        position: joi_1.default.number().required()
    });
    return schema.validate(data);
};
exports.postChief = postChief;
const updChief = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string(),
        title: joi_1.default.string(),
        image: joi_1.default.any(),
        position: joi_1.default.number()
    });
    return schema.validate(data);
};
exports.updChief = updChief;
const postPastOba = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        from: joi_1.default.string().required(),
        to: joi_1.default.string().required(),
        position: joi_1.default.number().required()
    });
    return schema.validate(data);
};
exports.postPastOba = postPastOba;
const updPastOba = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string(),
        from: joi_1.default.string(),
        to: joi_1.default.string()
    });
    return schema.validate(data);
};
exports.updPastOba = updPastOba;
const postOlori = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.postOlori = postOlori;
const updOlori = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.updOlori = updOlori;
//# sourceMappingURL=council.validators.js.map