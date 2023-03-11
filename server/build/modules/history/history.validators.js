"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updHistory = exports.postHistory = void 0;
const joi_1 = __importDefault(require("joi"));
const postHistory = (data) => {
    const schema = joi_1.default.object().keys({
        history: joi_1.default.string().required()
    });
    return schema.validate(data);
};
exports.postHistory = postHistory;
const updHistory = (data) => {
    const schema = joi_1.default.object().keys({
        history: joi_1.default.string()
    });
    return schema.validate(data);
};
exports.updHistory = updHistory;
//# sourceMappingURL=history.validators.js.map