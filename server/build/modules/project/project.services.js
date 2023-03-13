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
exports.delete_single_image = exports.delProject = exports.fetchProjectLimit = exports.fetchProjectClient = exports.fetchProject = exports.readSingleProject = exports.updProjectImg = exports.updProject = exports.newProject = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const models_1 = __importDefault(require("../../sequelize/models"));
const response_codes_1 = require("../../constants/response-codes");
const appError_1 = __importDefault(require("../../utils/appError"));
const sequelize_1 = require("sequelize");
const Pagination_1 = require("../../helpers/Pagination");
const { sequelize } = models_1.default;
const { Project } = models_1.default;
const newProject = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const new_project = yield Project.create(Object.assign({}, req.body));
        yield transaction.commit();
        return new_project;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.newProject = newProject;
const updProject = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const upd_project = yield Project.update(Object.assign({}, req.body), { where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
        return upd_project;
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updProject = updProject;
const updProjectImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield Project.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { id: req.params.id } }, { transaction });
        yield transaction.commit();
    }
    catch (e) {
        if (transaction) {
            yield transaction.rollback();
        }
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.updProjectImg = updProjectImg;
const readSingleProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const single_project = yield Project.findOne({ where: { id: req.params.id } });
        return single_project;
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.readSingleProject = readSingleProject;
const fetchProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const keys = ["project"];
        const search = (data) => {
            return data.filter((item) => {
                keys.some((key) => {
                    item[key].toLowerCase().includes(q);
                });
            });
        };
        const biz = yield Project.findAll({
            where: { isProject: "active" },
            limit: 5,
            order: [["createdAt"]],
        });
        const result = q ? search(biz) : biz;
        const array = [];
        result.map((value) => {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            }
            const fetch = limit(value.detail, 187);
            array.push({
                id: value.id,
                detail: fetch,
                image: value.image,
                project: value.project
            });
        });
        return { result, array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchProject = fetchProject;
const fetchProjectClient = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, size } = req.query;
        const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
        const news = yield Project.findAndCountAll({
            where: { isProject: "active" },
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
            const fetch = limit(value === null || value === void 0 ? void 0 : value.detail, 187);
            array.push({
                id: value === null || value === void 0 ? void 0 : value.id,
                detail: fetch,
                image: (value === null || value === void 0 ? void 0 : value.image) && (value === null || value === void 0 ? void 0 : value.image[0]),
                project: value === null || value === void 0 ? void 0 : value.project.toUpperCase()
            });
        });
        return { result, array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchProjectClient = fetchProjectClient;
const fetchProjectLimit = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project.findAll({ where: { isProject: "active" } }, {
            order: [["createdAt", "ASC"]]
        });
        const array = [];
        project.map((value) => {
            function limit(string = '', limit = 0) {
                return string.substring(0, limit);
            }
            const fetch = limit(value.detail, 100);
            const newPro = limit(value.project, 18);
            if (array.length < 3) {
                array.push({
                    id: value.id,
                    detail: fetch,
                    image: value.image,
                    project: newPro.toUpperCase()
                });
            }
        });
        return { array };
    }
    catch (e) {
        return next(new appError_1.default(e, response_codes_1.BAD_REQUEST));
    }
});
exports.fetchProjectLimit = fetchProjectLimit;
const delProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const fetch = yield Project.findOne({ where: { id: req.params.id } }, { transaction });
        const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
        img.map((value) => {
            if (fetch.dataValues.image !== null) {
                if (fetch.dataValues.image.includes(value)) {
                    fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
                }
            }
        });
        const del = yield Project.destroy({ where: { id: req.params.id } });
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
exports.delProject = delProject;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction;
    try {
        transaction = yield sequelize.transaction();
        const rmv = req.params.id;
        yield Project.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: { isProject: "active" } }, { transaction });
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
//# sourceMappingURL=project.services.js.map