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
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const sequelize_1 = require("sequelize");
const Pagination_1 = require("../../helpers/Pagination");
const News_1 = __importDefault(require("../../models/News"));
const newNews = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const create_news = yield News_1.default.create(Object.assign({}, req.body));
    return create_news;
});
exports.newNews = newNews;
const updNews = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const upd_news = yield News_1.default.update(Object.assign({}, req.body), { where: { id: req.params.id } });
    return upd_news;
});
exports.updNews = updNews;
const updNewsImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const filenames = req.files;
    const img = filenames.map((file) => file.filename);
    const new_image = [];
    img.map((value) => {
        new_image.push(value);
    });
    const main_img = new_image.toString();
    yield News_1.default.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { id: req.params.id } });
});
exports.updNewsImg = updNewsImg;
const readSingleNews = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_news = yield News_1.default.findOne({ where: { id: req.params.id } });
    return single_news;
});
exports.readSingleNews = readSingleNews;
const fetchNewsActive = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
    const news = yield News_1.default.findAndCountAll({
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
});
exports.fetchNewsActive = fetchNewsActive;
const fetchNewsLimit = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield News_1.default.findAll({ where: { status: "active" } });
    for (let i = 1; i < news.length; i++) {
        for (let j = i; j > 0; j--) {
            const _t1 = news[j];
            const _t0 = news[j - 1];
            if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
                news[j] = _t0;
                news[j - 1] = _t1;
            }
            else {
            }
        }
    }
    const array = [];
    news === null || news === void 0 ? void 0 : news.map((value) => {
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
});
exports.fetchNewsLimit = fetchNewsLimit;
const fetchNewsAll = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const keys = ["title"];
        const search = (data) => {
            return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)));
        };
        const biz = yield (News_1.default === null || News_1.default === void 0 ? void 0 : News_1.default.findAll({
            where: {
                status: {
                    [sequelize_1.Op.or]: ["pending", "active"]
                }
            }
        }));
        for (let i = 1; i < biz.length; i++) {
            for (let j = i; j > 0; j--) {
                const _t1 = biz[j];
                const _t0 = biz[j - 1];
                if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
                    biz[j] = _t0;
                    biz[j - 1] = _t1;
                }
                else {
                }
            }
        }
        const result = q ? search(biz) : biz;
        const array = [];
        result === null || result === void 0 ? void 0 : result.map((value) => {
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
    const fetch = yield News_1.default.findOne({ where: { id: req.params.id } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    yield News_1.default.destroy({ where: { id: req.params.id } });
});
exports.delNews = delNews;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rmv = req.params.id;
    yield News_1.default.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: {
            status: {
                [sequelize_1.Op.or]: ["pending", "active"]
            }
        } });
    const files = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, '../../../uploads'));
    files.map((value) => {
        if (value === rmv) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
});
exports.delete_single_image = delete_single_image;
const updValid = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const activate = "active";
    const deactivate = "pending";
    const fetch = yield News_1.default.findByPk(req.params.id);
    if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.status) === 'pending') {
        yield (News_1.default === null || News_1.default === void 0 ? void 0 : News_1.default.update({
            status: activate,
        }, { where: { id: req.params.id } }));
    }
    else {
        yield (News_1.default === null || News_1.default === void 0 ? void 0 : News_1.default.update({
            status: deactivate,
        }, { where: { id: req.params.id } }));
    }
});
exports.updValid = updValid;
//# sourceMappingURL=news.services.js.map