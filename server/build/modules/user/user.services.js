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
exports.fetchUser = exports.deleteUser = exports.singleUser = exports.updateUser = exports.adminReg = void 0;
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const auth_1 = require("../../utils/auth");
const { Admin } = models_1.default;
const { sequelize } = models_1.default;
const { UserToken } = models_1.default;
const adminReg = (body, next, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { phone_num, unique, user_type } = body;
        const user = yield Admin.findOne({ where: { phone_num } }, { transaction });
        if (user) {
            return next(new appError_1.default("Phone number already in use", response_codes_1.BAD_REQUEST));
        }
        if (user_type === 'admin') {
            if (unique !== 'mofaramade') {
                return next(new appError_1.default("Unique admin text is not correct", response_codes_1.BAD_REQUEST));
            }
        }
        const hashPass = (0, auth_1.hash)(req.body.password);
        const hashConfirmPass = (0, auth_1.hash)(req.body.confirm_password);
        const newAdminUser = yield Admin.create(Object.assign(Object.assign({}, req.body), { password: hashPass, confirm_password: hashConfirmPass }), { transaction });
        yield transaction.commit();
        return newAdminUser;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.adminReg = adminReg;
const updateUser = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        if (req.body.password || req.body.confirm_password) {
            req.body.password = (0, auth_1.hash)(req.body.password);
            req.body.confirm_password = (0, auth_1.hash)(req.body.confirm_password);
        }
        const { phone_num, password, confirm_password } = body;
        const fetch = yield Admin.findOne({ where: { phone_num: req.params.id } }, { transaction });
        if (phone_num) {
            const user = yield Admin.findOne({ where: { phone_num } }, { transaction });
            if (user && user.dataValues.phone_num !== fetch.dataValues.phone_num) {
                return next(new appError_1.default("A user with this phone number already exist", response_codes_1.BAD_REQUEST));
            }
        }
        const user = yield Admin.update(Object.assign(Object.assign({}, req.body), { password,
            confirm_password }), { where: { phone_num: req.params.id } }, { transaction });
        yield transaction.commit();
        return user;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updateUser = updateUser;
const singleUser = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Admin.findOne({ where: { phone_num: req.params.id } });
        return user;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.singleUser = singleUser;
const deleteUser = (next, userId, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Admin.findOne({ where: { phone_num: userId } });
        if (fetch.dataValues.id === req.data.id) {
            yield Admin.destroy({ where: { phone_num: userId } }, { transaction });
            const token = req.cookies['refreshToken'];
            if (token) {
                yield UserToken.destroy({ where: { token: token } }, { transaction });
                res.cookie('refreshToken', '', {
                    httpOnly: true,
                    maxAge: 0
                });
            }
        }
        else {
            yield Admin.destroy({ where: { phone_num: userId } }, { transaction });
        }
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.deleteUser = deleteUser;
const fetchUser = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.findAll();
        return admin;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchUser = fetchUser;
//# sourceMappingURL=user.services.js.map