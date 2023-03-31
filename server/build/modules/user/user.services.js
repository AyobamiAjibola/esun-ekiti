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
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const auth_1 = require("../../utils/auth");
const UserToken_1 = __importDefault(require("../../models/UserToken"));
const Admin_1 = __importDefault(require("../../models/Admin"));
const adminReg = (body, next, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone_num, unique, user_type } = body;
    const user = yield Admin_1.default.findOne({ where: { phone_num } });
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
    const newAdminUser = yield Admin_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashPass, confirm_password: hashConfirmPass }));
    return newAdminUser;
});
exports.adminReg = adminReg;
const updateUser = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password || req.body.confirm_password) {
        req.body.password = (0, auth_1.hash)(req.body.password);
        req.body.confirm_password = (0, auth_1.hash)(req.body.confirm_password);
    }
    const { phone_num, password, confirm_password } = body;
    const fetch = yield Admin_1.default.findOne({ where: { phone_num: req.params.id } });
    if (phone_num) {
        const user = yield Admin_1.default.findOne({ where: { phone_num } });
        if (user && user.dataValues.phone_num !== (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.phone_num)) {
            return next(new appError_1.default("A user with this phone number already exist", response_codes_1.BAD_REQUEST));
        }
    }
    const user = yield (Admin_1.default === null || Admin_1.default === void 0 ? void 0 : Admin_1.default.update(Object.assign(Object.assign({}, req.body), { password,
        confirm_password }), { where: { phone_num: req.params.id } }));
    return user;
});
exports.updateUser = updateUser;
const singleUser = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (Admin_1.default === null || Admin_1.default === void 0 ? void 0 : Admin_1.default.findOne({ where: { phone_num: req.params.id } }));
    return user;
});
exports.singleUser = singleUser;
const deleteUser = (next, userId, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Admin_1.default.findOne({ where: { phone_num: userId } });
    if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.id) === req.data.id) {
        yield Admin_1.default.destroy({ where: { phone_num: userId } });
        const token = req.cookies['refreshToken'];
        if (token) {
            yield (UserToken_1.default === null || UserToken_1.default === void 0 ? void 0 : UserToken_1.default.destroy({ where: { token: token } }));
            res.cookie('refreshToken', '', {
                httpOnly: true,
                maxAge: 0
            });
        }
    }
    else {
        yield Admin_1.default.destroy({ where: { phone_num: userId } });
    }
});
exports.deleteUser = deleteUser;
const fetchUser = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield Admin_1.default.findAll();
    return admin;
});
exports.fetchUser = fetchUser;
//# sourceMappingURL=user.services.js.map