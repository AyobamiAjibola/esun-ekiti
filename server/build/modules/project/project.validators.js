"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updProject = exports.postProject = void 0;
const joi_1 = __importDefault(require("joi"));
const postProject = (data) => {
    const schema = joi_1.default.object().keys({
        project: joi_1.default.string().required(),
        detail: joi_1.default.string().required()
    });
    return schema.validate(data);
};
exports.postProject = postProject;
const updProject = (data) => {
    const schema = joi_1.default.object().keys({
        project: joi_1.default.string(),
        detail: joi_1.default.string(),
    });
    return schema.validate(data);
};
exports.updProject = updProject;
//# sourceMappingURL=project.validators.js.map