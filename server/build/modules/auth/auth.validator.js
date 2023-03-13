"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const authLogin = (data) => {
    const schema = joi_1.default.object().keys({
        phone_num: joi_1.default.string()
            .regex(/^[0-9]{11}$/)
            .messages({ "string.pattern.base": `Phone number must have 11 digits.` })
            .required(),
        password: (0, joi_password_complexity_1.default)().required(),
    });
    return schema.validate(data);
};
exports.authLogin = authLogin;
//# sourceMappingURL=auth.validator.js.map