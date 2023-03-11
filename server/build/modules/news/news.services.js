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
exports.updValid = exports.delete_single_image = exports.delNews = exports.fetchNewsAll = exports.fetchNewsLimit = exports.fetchNewsActive = exports.readSingleNews = exports.updNewsImg = exports.updNews = exports.newNews = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const sequelize_1 = require("sequelize");
const Pagination_1 = require("../../helpers/Pagination");
const { sequelize } = models_1.default;
const { News } = models_1.default;
const newNews = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const create_news = yield News.create(Object.assign({}, req.body));
        yield transaction.commit();
        return create_news;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newNews = newNews;
const updNews = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const upd_news = yield News.update(Object.assign({}, req.body), { where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
        return upd_news;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updNews = updNews;
const updNewsImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield News.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updNewsImg = updNewsImg;
const readSingleNews = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_news = yield News.findOne({ where: { id: req.params.id } });
        return single_news;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSingleNews = readSingleNews;
const fetchNewsActive = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, size } = req.query;
        const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
        const news = yield News.findAndCountAll({
            where: { status: "active" },
            limit,
            offset,
            order: [
                ["createdAt", "ASC"]
            ]
        });
        const result = (0, Pagination_1.getPagingData)(news, page, limit);
        const array = [];
        result === null || result === void 0 ? void 0 : result.result.map((value) => {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            }
            const fetch = limit(value === null || value === void 0 ? void 0 : value.news, 200);
            array.push({
                id: value === null || value === void 0 ? void 0 : value.id,
                news: fetch,
                image: (value === null || value === void 0 ? void 0 : value.image) && (value === null || value === void 0 ? void 0 : value.image[0]),
                title: value === null || value === void 0 ? void 0 : value.title.toUpperCase(),
                createdAt: value === null || value === void 0 ? void 0 : value.createdAt.toLocaleString('en-US'),
                status: value === null || value === void 0 ? void 0 : value.status
            });
        });
        return { array, result };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchNewsActive = fetchNewsActive;
const fetchNewsLimit = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield News.findAll({ where: { status: "active" } }, {
            order: [["createdAt"]],
        });
        const array = [];
        news.map((value) => {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            }
            const fetch = limit(value.news, 160);
            if (array.length < 2) {
                array.push({ id: value.id,
                    news: fetch, image: value.image,
                    title: value.title,
                    createdAt: value.createdAt.toLocaleString('en-US'),
                    status: value.status
                });
            }
        });
        return { array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchNewsLimit = fetchNewsLimit;
const fetchNewsAll = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const keys = ["title"];
        const search = (data) => {
            return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
        };
        const biz = yield News.findAll({
            where: {
                status: {
                    [sequelize_1.Op.or]: ["pending", "active"]
                }
            },
            order: [["createdAt"]],
        });
        const result = q ? search(biz) : biz;
        const array = [];
        result.map((value) => {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            }
            const fetch = limit(value.news, 187);
            array.push({ id: value.id,
                news: fetch, image: value.image,
                title: value.title,
                createdAt: value.createdAt.toLocaleString('en-US'),
                status: value.status
            });
        });
        return { result, array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchNewsAll = fetchNewsAll;
const delNews = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield News.findOne({ where: { id: req.params.id } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.image !== null) {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
        yield News.destroy({ where: { id: req.params.id } });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.delNews = delNews;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const rmv = req.params.id;
        yield News.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: {
                status: {
                    [sequelize_1.Op.or]: ["pending", "active"]
                }
            } }, { transaction });
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
const updValid = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const activate = "active";
        const deactivate = "pending";
        const fetch = yield News.findByPk(req.params.id);
        if (fetch.dataValues.status === 'pending') {
            yield News.update({
                status: activate,
            }, { where: { id: req.params.id } }, { transaction });
        }
        else {
            yield News.update({
                status: deactivate,
            }, { where: { id: req.params.id } }, { transaction });
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
exports.updValid = updValid;
//# sourceMappingURL=news.services.js.map