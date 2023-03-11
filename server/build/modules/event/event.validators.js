"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updEvent = exports.postEvent = void 0;
const joi_1 = __importDefault(require("joi"));
const postEvent = (data) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        detail: joi_1.default.string().required(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.postEvent = postEvent;
const updEvent = (data) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string(),
        detail: joi_1.default.string(),
        image: joi_1.default.any()
    });
    return schema.validate(data);
};
exports.updEvent = updEvent;
//# sourceMappingURL=event.validators.js.map