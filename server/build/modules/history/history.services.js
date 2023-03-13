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
exports.delete_single_image = exports.delHistory = exports.readSingleHistory = exports.fetchHistory = exports.updHistoryImg = exports.updHistory = exports.history = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const sequelize_1 = require("sequelize");
const { sequelize } = models_1.default;
const { History } = models_1.default;
const history = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield History.findOne({ where: { esun: 'esun' } });
        if (fetch)
            return next(new appError_1.default("History already curated", response_codes_1.FORBIDDEN));
        const create_history = yield History.create(Object.assign({}, req.body));
        yield transaction.commit();
        return create_history;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.history = history;
const updHistory = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { history } = body;
        const upd_history = yield History.update({
            history
        }, { where: { esun: 'esun' } }, { transaction });
        yield transaction.commit();
        return upd_history;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updHistory = updHistory;
const updHistoryImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const filenames = req.files;
        const img = filenames.map((file) => file.filename);
        const new_image = [];
        img.map((value) => {
            new_image.push(value);
        });
        const main_img = new_image.toString();
        yield History.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { esun: 'esun' } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updHistoryImg = updHistoryImg;
const fetchHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield History.findOne({ where: { esun: 'esun' } });
        function limit(string = '', limit = 0) {
            return string.substring(0, limit);
        }
        const fetch = limit(result === null || result === void 0 ? void 0 : result.history, 1062);
        return { result, fetch };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchHistory = fetchHistory;
const readSingleHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_history = yield History.findOne({ where: { id: req.params.id } });
        return single_history;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSingleHistory = readSingleHistory;
const delHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield History.findOne({ where: { id: req.params.id } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.images.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        });
        const del = yield History.destroy({ where: { id: req.params.id } });
        yield transaction.commit();
        return del;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.delHistory = delHistory;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const rmv = req.params.id;
        yield History.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: { esun: 'esun' } }, { transaction });
        const files = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, '../../../uploads'));
        files.map((value) => {
            if (value === rmv) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        });
        yield transaction.commit();
    }
    catch (error) {
        if (transaction) {
            yield transaction.rollback();
        }
    }
});
exports.delete_single_image = delete_single_image;
//# sourceMappingURL=history.services.js.map