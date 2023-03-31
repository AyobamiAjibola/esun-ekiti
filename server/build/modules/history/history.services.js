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
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const sequelize_1 = require("sequelize");
const History_1 = __importDefault(require("../../models/History"));
const history = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield History_1.default.findOne({ where: { esun: 'esun' } });
    if (fetch)
        return next(new appError_1.default("History already curated", response_codes_1.FORBIDDEN));
    const create_history = yield History_1.default.create(Object.assign({}, req.body));
    return create_history;
});
exports.history = history;
const updHistory = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { history } = body;
    const upd_history = yield History_1.default.update({
        history
    }, { where: { esun: 'esun' } });
    return upd_history;
});
exports.updHistory = updHistory;
const updHistoryImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const filenames = req.files;
    const img = filenames.map((file) => file.filename);
    const new_image = [];
    img.map((value) => {
        new_image.push(value);
    });
    const main_img = new_image.toString();
    yield History_1.default.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { esun: 'esun' } });
});
exports.updHistoryImg = updHistoryImg;
const fetchHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield History_1.default.findOne({ where: { esun: 'esun' } });
    function limit(string = '', limit = 0) {
        return string.substring(0, limit);
    }
    const fetch = limit(result === null || result === void 0 ? void 0 : result.history, 1062);
    return { result, fetch };
});
exports.fetchHistory = fetchHistory;
const readSingleHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_history = yield (History_1.default === null || History_1.default === void 0 ? void 0 : History_1.default.findOne({ where: { id: req.params.id } }));
    return single_history;
});
exports.readSingleHistory = readSingleHistory;
const delHistory = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield History_1.default.findOne({ where: { id: req.params.id } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
    const del = yield History_1.default.destroy({ where: { id: req.params.id } });
    return del;
});
exports.delHistory = delHistory;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rmv = req.params.id;
    yield History_1.default.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: { esun: 'esun' } });
    const files = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, '../../../uploads'));
    files.map((value) => {
        if (value === rmv) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
});
exports.delete_single_image = delete_single_image;
//# sourceMappingURL=history.services.js.map