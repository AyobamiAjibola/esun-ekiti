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
exports.delPastOba = exports.fetchPastObaAdmin = exports.fetchPastObas = exports.readSinglePastOba = exports.updPastOba = exports.newPastOba = exports.delChief = exports.fetchChiefsAdmin = exports.fetchChiefs = exports.readSingleChief = exports.updChiefImg = exports.updChief = exports.newChief = exports.delOlori = exports.fetchOlori = exports.updOlori = exports.newOlori = exports.delOba = exports.fetchObas = exports.readSingleOba = exports.updOba = exports.newOba = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const Pagination_1 = require("../../helpers/Pagination");
const Oba_1 = __importDefault(require("../../models/Oba"));
const Olori_1 = __importDefault(require("../../models/Olori"));
const Chief_1 = __importDefault(require("../../models/Chief"));
const PastOba_1 = __importDefault(require("../../models/PastOba"));
const newOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Oba_1.default.findOne({ where: { oba: 'elesun' } });
    if (fetch)
        return next(new appError_1.default("An Oba already exist", response_codes_1.FORBIDDEN));
    const image = req.file ? req.file.filename : "";
    const new_oba = yield Oba_1.default.create(Object.assign(Object.assign({}, req.body), { image }));
    return new_oba;
});
exports.newOba = newOba;
const updOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file && req.file.filename;
    if (image) {
        const fetch = yield Oba_1.default.findOne({ where: { oba: "elesun" } });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        });
    }
    const new_oba = yield (Oba_1.default === null || Oba_1.default === void 0 ? void 0 : Oba_1.default.update(Object.assign(Object.assign({}, req.body), { image }), { where: { oba: "elesun" } }));
    return new_oba;
});
exports.updOba = updOba;
const readSingleOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_oba = yield Oba_1.default.findOne({ where: { id: req.params.id } });
    return single_oba;
});
exports.readSingleOba = readSingleOba;
const fetchObas = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Oba_1.default.findOne({ where: { oba: 'elesun' } });
    function limit(string = '', limit = 0) {
        return string === null || string === void 0 ? void 0 : string.substring(0, limit);
    }
    const array = limit(result === null || result === void 0 ? void 0 : result.dataValues.bio, 400);
    return { result, array };
});
exports.fetchObas = fetchObas;
const delOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Oba_1.default.findOne({ where: { oba: 'elesun' } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    const fetchOlori = yield Olori_1.default.findOne({ where: { olori: 'elesun' } });
    const photo = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    fetchOlori && photo.map((value) => {
        if (fetchOlori === null || fetchOlori === void 0 ? void 0 : fetchOlori.dataValues.image.includes(value)) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
    yield Oba_1.default.destroy({ where: { oba: 'elesun' } });
    yield Olori_1.default.destroy({ where: { olori: 'elesun' } });
});
exports.delOba = delOba;
const newOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchOba = yield Oba_1.default.findOne({ where: { oba: 'elesun' } });
    if (!fetchOba)
        return next(new appError_1.default("Oba record not found. Create oba record", response_codes_1.FORBIDDEN));
    const fetch = yield Olori_1.default.findOne({ where: { olori: 'elesun' } });
    if (fetch)
        return next(new appError_1.default("An Olori already exist", response_codes_1.FORBIDDEN));
    const image = req.file ? req.file.filename : "";
    const new_olori = yield (Olori_1.default === null || Olori_1.default === void 0 ? void 0 : Olori_1.default.create(Object.assign(Object.assign({}, req.body), { image })));
    return new_olori;
});
exports.newOlori = newOlori;
const updOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file && req.file.filename;
    if (image) {
        const fetch = yield Olori_1.default.findOne({ where: { olori: "elesun" } });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        });
    }
    const new_olori = yield Olori_1.default.update(Object.assign(Object.assign({}, req.body), { image }), { where: { olori: "elesun" } });
    return new_olori;
});
exports.updOlori = updOlori;
const fetchOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const biz = yield Olori_1.default.findOne({ where: { olori: 'elesun' } });
    const result = biz;
    return result;
});
exports.fetchOlori = fetchOlori;
const delOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Olori_1.default.findOne({ where: { olori: 'elesun' } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    yield Olori_1.default.destroy({ where: { olori: 'elesun' } });
});
exports.delOlori = delOlori;
const newChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, position } = req.body;
    const chief = yield Chief_1.default.findOne({ where: { title } });
    if (chief) {
        return next(new appError_1.default("Title already in use", response_codes_1.BAD_REQUEST));
    }
    const pos = yield Chief_1.default.findOne({ where: { position } });
    if (pos) {
        return next(new appError_1.default("A chief with this position already exist", response_codes_1.BAD_REQUEST));
    }
    if (position < 1) {
        return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
    }
    const new_chief = yield (Chief_1.default === null || Chief_1.default === void 0 ? void 0 : Chief_1.default.create(Object.assign({}, req.body)));
    return new_chief;
});
exports.newChief = newChief;
const updChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, position } = req.body;
    const chief = yield Chief_1.default.findOne({ where: { title } });
    const fetch = yield Chief_1.default.findOne({ where: { title: req.params.id } });
    if (chief) {
        if (chief && (chief === null || chief === void 0 ? void 0 : chief.dataValues.title) !== (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.title))
            return next(new appError_1.default("Title already in use", response_codes_1.BAD_REQUEST));
    }
    const fetchD = yield Chief_1.default.findOne({ where: { title: req.params.id } });
    if (title) {
        const chiefTitle = yield Chief_1.default.findOne({ where: { title } });
        if (chiefTitle && chiefTitle.dataValues.title !== (fetchD === null || fetchD === void 0 ? void 0 : fetchD.dataValues.title)) {
            return next(new appError_1.default("A chief with this title already exist", response_codes_1.BAD_REQUEST));
        }
    }
    const fetchPos = yield Chief_1.default.findOne({ where: { title: req.params.id } });
    if (title) {
        const chiefPos = yield Chief_1.default.findOne({ where: { position } });
        if (chiefPos && chiefPos.dataValues.position !== (fetchPos === null || fetchPos === void 0 ? void 0 : fetchPos.dataValues.position)) {
            return next(new appError_1.default("A chief with this position already exist", response_codes_1.BAD_REQUEST));
        }
    }
    if (position < 1) {
        return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
    }
    const new_chief = yield Chief_1.default.update(Object.assign({}, req.body), { where: { title: req.params.id } });
    return new_chief;
});
exports.updChief = updChief;
const updChiefImg = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file && req.file.filename;
    if (image) {
        const fetch = yield Chief_1.default.findOne({ where: { title: req.params.id } });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) {
                if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
    }
    const new_chief = yield Chief_1.default.update({
        image
    }, { where: { title: req.params.id } });
    return new_chief;
});
exports.updChiefImg = updChiefImg;
const readSingleChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_Chief = yield Chief_1.default.findOne({ where: { title: req.params.id } });
    return single_Chief;
});
exports.readSingleChief = readSingleChief;
const fetchChiefs = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 0;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber === 5) {
        size = sizeAsNumber;
    }
    const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
    const chiefs = yield Chief_1.default.findAndCountAll({
        limit,
        offset,
        order: [
            ["position", "ASC"]
        ],
    });
    const response = (0, Pagination_1.getPagingData)(chiefs, page, limit);
    return response;
});
exports.fetchChiefs = fetchChiefs;
const fetchChiefsAdmin = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const chiefs = yield Chief_1.default.findAll({
        order: [
            ["position", "ASC"]
        ],
    });
    return chiefs;
});
exports.fetchChiefsAdmin = fetchChiefsAdmin;
const delChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Chief_1.default.findOne({ where: { title: req.params.id } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    yield Chief_1.default.destroy({ where: { title: req.params.id } });
});
exports.delChief = delChief;
const newPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { position } = req.body;
    const pos = yield PastOba_1.default.findOne({ where: { position } });
    if (pos) {
        return next(new appError_1.default("Oba with this position already exist", response_codes_1.BAD_REQUEST));
    }
    if (position < 1) {
        return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
    }
    const new_past_oba = yield PastOba_1.default.create(Object.assign({}, req.body));
    return new_past_oba;
});
exports.newPastOba = newPastOba;
const updPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const new_past_oba = yield PastOba_1.default.update(req.body, { where: { id: req.params.id } });
    return new_past_oba;
});
exports.updPastOba = updPastOba;
const readSinglePastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_past_oba = yield PastOba_1.default.findOne({ where: { id: req.params.id } });
    return single_past_oba;
});
exports.readSinglePastOba = readSinglePastOba;
const fetchPastObas = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 0;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber === 2) {
        size = sizeAsNumber;
    }
    const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
    const pastOba = yield PastOba_1.default.findAndCountAll({
        limit,
        offset,
        order: [
            ["createdAt", "ASC"]
        ],
    });
    const response = (0, Pagination_1.getPagingData)(pastOba, page, limit);
    return response;
});
exports.fetchPastObas = fetchPastObas;
const fetchPastObaAdmin = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const pastOba = yield PastOba_1.default.findAll({
        order: [
            ["position", "ASC"]
        ],
    });
    return pastOba;
});
exports.fetchPastObaAdmin = fetchPastObaAdmin;
const delPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    yield PastOba_1.default.destroy({ where: { id: req.params.id } });
});
exports.delPastOba = delPastOba;
//# sourceMappingURL=council.services.js.map