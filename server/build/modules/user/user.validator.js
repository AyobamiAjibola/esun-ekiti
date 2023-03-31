"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updAdmin = exports.postAdmin = void 0;
const joi_1 = __importDefault(require("joi"));
const postAdmin = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        phone_num: joi_1.default.string()
            .regex(/^[0-9]{11}$/)
            .messages({ "string.pattern.base": `Phone number must have 11 digits.` })
            .required(),
        password: joi_1.default.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .messages({
            "string.pattern.base": `Password does not meet requirement. Number, Special Character and one UpperCase letter must be present`,
        })
            .required(),
        confirm_password: joi_1.default.ref("password"),
        unique: joi_1.default.string(),
        isAdmin: joi_1.default.boolean(),
        user_type: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.postAdmin = postAdmin;
const updAdmin = (data) => {
    const schema = joi_1.default.object().keys({
        fullName: joi_1.default.string(),
        phone_num: joi_1.default.string()
            .regex(/^[0-9]{11}$/)
            .messages({ "string.pattern.base": `Phone number must have 11 digits.` }),
        password: joi_1.default.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .messages({
            "string.pattern.base": `Password does not meet requirement. Number, Special Character and one UpperCase letter must be present`,
        }),
        confirm_password: joi_1.default.ref("password")
    });
    return schema.validate(data);
};
exports.updAdmin = updAdmin;
//# sourceMappingURL=user.validator.js.map