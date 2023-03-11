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
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const Pagination_1 = require("../../helpers/Pagination");
const { sequelize } = models_1.default;
const { Oba } = models_1.default;
const { Olori } = models_1.default;
const { Chief } = models_1.default;
const { PastOba } = models_1.default;
const newOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Oba.findOne({ where: { oba: 'elesun' } });
        if (fetch)
            return next(new appError_1.default("An Oba already exist", response_codes_1.FORBIDDEN));
        const image = req.file ? req.file.filename : "";
        const new_oba = yield Oba.create(Object.assign(Object.assign({}, req.body), { image }));
        yield transaction.commit();
        return new_oba;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newOba = newOba;
const updOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const image = req.file && req.file.filename;
        if (image) {
            const fetch = yield Oba.findOne({ where: { oba: "elesun" } }, { transaction });
            const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
            img.map((value) => {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            });
        }
        const new_oba = yield Oba.update(Object.assign(Object.assign({}, req.body), { image }), { where: { oba: "elesun" } }, { transaction });
        yield transaction.commit();
        return new_oba;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updOba = updOba;
const readSingleOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_oba = yield Oba.findOne({ where: { id: req.params.id } });
        return single_oba;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSingleOba = readSingleOba;
const fetchObas = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Oba.findOne({ where: { oba: 'elesun' } });
        function limit(string = '', limit = 0) {
            return string.substring(0, limit);
        }
        const array = limit(result.dataValues.bio, 400);
        return { result, array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchObas = fetchObas;
const delOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Oba.findOne({ where: { oba: 'elesun' } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.image !== null) {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
        const fetchOlori = yield Olori.findOne({ where: { olori: 'elesun' } }, { transaction });
        const photo = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        fetchOlori && photo.map((value) => {
            if (fetchOlori.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        });
        yield Oba.destroy({ where: { oba: 'elesun' } }, { transaction });
        yield Olori.destroy({ where: { olori: 'elesun' } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.delOba = delOba;
const newOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetchOba = yield Oba.findOne({ where: { oba: 'elesun' } });
        if (!fetchOba)
            return next(new appError_1.default("Oba record not found. Create oba record", response_codes_1.FORBIDDEN));
        const fetch = yield Olori.findOne({ where: { olori: 'elesun' } });
        if (fetch)
            return next(new appError_1.default("An Olori already exist", response_codes_1.FORBIDDEN));
        const image = req.file ? req.file.filename : "";
        const new_olori = yield Olori.create(Object.assign(Object.assign({}, req.body), { image }));
        yield transaction.commit();
        return new_olori;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newOlori = newOlori;
const updOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const image = req.file && req.file.filename;
        if (image) {
            const fetch = yield Olori.findOne({ where: { olori: "elesun" } }, { transaction });
            const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
            img.map((value) => {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            });
        }
        const new_olori = yield Olori.update(Object.assign(Object.assign({}, req.body), { image }), { where: { olori: "elesun" } }, { transaction });
        yield transaction.commit();
        return new_olori;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updOlori = updOlori;
const fetchOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const biz = yield Olori.findOne({ where: { olori: 'elesun' } });
        const result = biz;
        return result;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchOlori = fetchOlori;
const delOlori = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Olori.findOne({ where: { olori: 'elesun' } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.image !== null) {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
        yield Olori.destroy({ where: { olori: 'elesun' } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.delOlori = delOlori;
const newChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { title, position } = req.body;
        const chief = yield Chief.findOne({ where: { title } }, { transaction });
        if (chief) {
            return next(new appError_1.default("Title already in use", response_codes_1.BAD_REQUEST));
        }
        const pos = yield Chief.findOne({ where: { position } }, { transaction });
        if (pos) {
            return next(new appError_1.default("A chief with this position already exist", response_codes_1.BAD_REQUEST));
        }
        if (position < 1) {
            return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
        }
        const new_chief = yield Chief.create(Object.assign({}, req.body));
        yield transaction.commit();
        return new_chief;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newChief = newChief;
const updChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { title, position } = req.body;
        const chief = yield Chief.findOne({ where: { title } }, { transaction });
        const fetch = yield Chief.findOne({ where: { title: req.params.id } }, { transaction });
        if (chief) {
            if (chief && chief.dataValues.title !== fetch.dataValues.title)
                return next(new appError_1.default("Title already in use", response_codes_1.BAD_REQUEST));
        }
        const fetchD = yield Chief.findOne({ where: { title: req.params.id } }, { transaction });
        if (title) {
            const chiefTitle = yield Chief.findOne({ where: { title } }, { transaction });
            if (chiefTitle && chiefTitle.dataValues.title !== fetchD.dataValues.title) {
                return next(new appError_1.default("A chief with this title already exist", response_codes_1.BAD_REQUEST));
            }
        }
        const fetchPos = yield Chief.findOne({ where: { title: req.params.id } }, { transaction });
        if (title) {
            const chiefPos = yield Chief.findOne({ where: { position } }, { transaction });
            if (chiefPos && chiefPos.dataValues.position !== fetchPos.dataValues.position) {
                return next(new appError_1.default("A chief with this position already exist", response_codes_1.BAD_REQUEST));
            }
        }
        if (position < 1) {
            return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
        }
        const new_chief = yield Chief.update(Object.assign({}, req.body), { where: { title: req.params.id } }, { transaction });
        yield transaction.commit();
        return new_chief;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        console.log(e.message);
    }
});
exports.updChief = updChief;
const updChiefImg = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const image = req.file && req.file.filename;
        if (image) {
            const fetch = yield Chief.findOne({ where: { title: req.params.id } }, { transaction });
            const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
            img.map((value) => {
                if (fetch.dataValues.image) {
                    if (fetch.dataValues.image.includes(value)) {
                        fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                    }
                }
            });
        }
        const new_chief = yield Chief.update({
            image
        }, { where: { title: req.params.id } }, { transaction });
        yield transaction.commit();
        return new_chief;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        console.log(e.message);
    }
});
exports.updChiefImg = updChiefImg;
const readSingleChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_Chief = yield Chief.findOne({ where: { title: req.params.id } });
        return single_Chief;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSingleChief = readSingleChief;
const fetchChiefs = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const chiefs = yield Chief.findAndCountAll({
            limit,
            offset,
            order: [
                ["position", "ASC"]
            ],
        });
        const response = (0, Pagination_1.getPagingData)(chiefs, page, limit);
        return response;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchChiefs = fetchChiefs;
const fetchChiefsAdmin = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chiefs = yield Chief.findAll({
            order: [
                ["position", "ASC"]
            ],
        });
        return chiefs;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchChiefsAdmin = fetchChiefsAdmin;
const delChief = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Chief.findOne({ where: { title: req.params.id } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.image !== null) {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
        yield Chief.destroy({ where: { title: req.params.id } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        console.log(e.message);
    }
});
exports.delChief = delChief;
const newPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const { position } = req.body;
        const pos = yield PastOba.findOne({ where: { position } }, { transaction });
        if (pos) {
            return next(new appError_1.default("Oba with this position already exist", response_codes_1.BAD_REQUEST));
        }
        if (position < 1) {
            return next(new appError_1.default("Negative values or zeros are not allowed in position", response_codes_1.BAD_REQUEST));
        }
        const new_past_oba = yield PastOba.create(Object.assign({}, req.body));
        yield transaction.commit();
        return new_past_oba;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newPastOba = newPastOba;
const updPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const new_past_oba = yield PastOba.update(req.body, { where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
        return new_past_oba;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updPastOba = updPastOba;
const readSinglePastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_past_oba = yield PastOba.findOne({ where: { id: req.params.id } });
        return single_past_oba;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSinglePastOba = readSinglePastOba;
const fetchPastObas = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const pastOba = yield PastOba.findAndCountAll({
            limit,
            offset,
            order: [
                ["createdAt", "ASC"]
            ],
        });
        const response = (0, Pagination_1.getPagingData)(pastOba, page, limit);
        return response;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchPastObas = fetchPastObas;
const fetchPastObaAdmin = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pastOba = yield PastOba.findAll({
            order: [
                ["position", "ASC"]
            ],
        });
        return pastOba;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchPastObaAdmin = fetchPastObaAdmin;
const delPastOba = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        yield PastOba.destroy({ where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.delPastOba = delPastOba;
//# sourceMappingURL=council.services.js.map