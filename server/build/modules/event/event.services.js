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
exports.delete_single_image = exports.delEvent = exports.fetchEvents = exports.fetchEventClient = exports.readSingleEvent = exports.updEventImg = exports.updEvent = exports.newEvent = void 0;
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const sequelize_1 = require("sequelize");
const Pagination_1 = require("../../helpers/Pagination");
const Event_1 = __importDefault(require("../../models/Event"));
const newEvent = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, detail } = body;
    const evt = yield Event_1.default.findOne({ where: { name } });
    if (evt) {
        return next(new appError_1.default("This event already exist", response_codes_1.BAD_REQUEST));
    }
    const create_event = yield Event_1.default.create(Object.assign(Object.assign({}, req.body), { name,
        detail }));
    return create_event;
});
exports.newEvent = newEvent;
const updEvent = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, detail } = body;
    const evt = yield Event_1.default.findOne({ where: { name } });
    const fetch = yield Event_1.default.findOne({ where: { name: req.params.id } });
    if (evt) {
        if (evt && evt.dataValues.name !== (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.name))
            return next(new appError_1.default("Event name already in use", response_codes_1.BAD_REQUEST));
    }
    const upd = yield Event_1.default.update({
        name,
        detail
    }, { where: { name: req.params.id } });
    return upd;
});
exports.updEvent = updEvent;
const updEventImg = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const filenames = req.files;
    const img = filenames.map((file) => file.filename);
    const new_image = [];
    img.map((value) => {
        new_image.push(value);
    });
    const main_img = new_image.toString();
    yield Event_1.default.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { name: req.params.id } });
});
exports.updEventImg = updEventImg;
const readSingleEvent = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_event = yield Event_1.default.findOne({ where: { name: req.params.id } });
    return single_event;
});
exports.readSingleEvent = readSingleEvent;
const fetchEventClient = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, size } = req.query;
    const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
    const evt = yield Event_1.default.findAndCountAll({
        where: { isEvent: "active" },
        limit,
        offset,
        order: [
            ["createdAt", "ASC"]
        ]
    });
    const result = (0, Pagination_1.getPagingData)(evt, page, limit);
    const array = [];
    (_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.map((value) => {
        function limit(string = '', limit = 0) {
            return string.substring(0, limit);
        }
        const fetch = limit(value === null || value === void 0 ? void 0 : value.detail, 200);
        array.push({
            id: value === null || value === void 0 ? void 0 : value.id,
            detail: fetch,
            image: (value === null || value === void 0 ? void 0 : value.image) && (value === null || value === void 0 ? void 0 : value.image[0]),
            name: value === null || value === void 0 ? void 0 : value.name.toUpperCase()
        });
    });
    return { array, result };
});
exports.fetchEventClient = fetchEventClient;
const fetchEvents = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    const keys = ["name"];
    const search = (data) => {
        return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
    };
    const evt = yield Event_1.default.findAll({
        where: { isEvent: "active" }
    });
    for (let i = 1; i < evt.length; i++) {
        for (let j = i; j > 0; j--) {
            const _t1 = evt[j];
            const _t0 = evt[j - 1];
            if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
                evt[j] = _t0;
                evt[j - 1] = _t1;
            }
            else {
            }
        }
    }
    const result = q ? search(evt) : evt;
    const array = [];
    result === null || result === void 0 ? void 0 : result.map((value) => {
        function limit(string = '', limit = 0) {
            return string.substring(0, limit);
        }
        const fetch = limit(value === null || value === void 0 ? void 0 : value.detail, 187);
        array.push({ id: value.id,
            detail: fetch,
            image: (value === null || value === void 0 ? void 0 : value.image) && (value === null || value === void 0 ? void 0 : value.image[0]),
            name: value.name.toUpperCase(),
            createdAt: value.createdAt.toLocaleString('en-US'),
            status: value.status });
    });
    return { result, array };
});
exports.fetchEvents = fetchEvents;
const delEvent = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Event_1.default.findOne({ where: { name: req.params.id } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    yield Event_1.default.destroy({ where: { name: req.params.id } });
});
exports.delEvent = delEvent;
const delete_single_image = (req, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rmv = req.params.id;
    yield Event_1.default.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: { isEvent: 'active' } });
    const files = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, '../../../uploads'));
    files.map((value) => {
        if (value === rmv) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
});
exports.delete_single_image = delete_single_image;
//# sourceMappingURL=event.services.js.map