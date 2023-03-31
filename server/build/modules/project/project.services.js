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
const sequelize_1 = require("sequelize");
const Pagination_1 = require("../../helpers/Pagination");
const Project_1 = __importDefault(require("../../models/Project"));
const newProject = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const new_project = yield Project_1.default.create(Object.assign({}, req.body));
    return new_project;
});
exports.newProject = newProject;
const updProject = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const upd_project = yield Project_1.default.update(Object.assign({}, req.body), { where: { id: req.params.id } });
    return upd_project;
});
exports.updProject = updProject;
const updProjectImg = (body, next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const filenames = req.files;
    const img = filenames.map((file) => file.filename);
    const new_image = [];
    img.map((value) => {
        new_image.push(value);
    });
    const main_img = new_image.toString();
    yield Project_1.default.update({ image: sequelize_1.Sequelize.fn("array_append", sequelize_1.Sequelize.col("image"), main_img) }, { where: { id: req.params.id } });
});
exports.updProjectImg = updProjectImg;
const readSingleProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const single_project = yield Project_1.default.findOne({ where: { id: req.params.id } });
    return single_project;
});
exports.readSingleProject = readSingleProject;
const fetchProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    const keys = ["project"];
    const search = (data) => {
        return data.filter((item) => {
            keys.some((key) => {
                item[key].toLowerCase().includes(q);
            });
        });
    };
    const biz = yield Project_1.default.findAll({
        where: { isProject: "active" },
        limit: 5
    });
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
        const fetch = limit(value.detail, 187);
        array.push({
            id: value.id,
            detail: fetch,
            image: value.image,
            project: value.project
        });
    });
    return { result, array };
});
exports.fetchProject = fetchProject;
const fetchProjectClient = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const { limit, offset } = (0, Pagination_1.getPagination)(page, size);
    const news = yield Project_1.default.findAndCountAll({
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
});
exports.fetchProjectClient = fetchProjectClient;
const fetchProjectLimit = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield Project_1.default.findAll({ where: { isProject: "active" } });
    for (let i = 1; i < project.length; i++) {
        for (let j = i; j > 0; j--) {
            const _t1 = project[j];
            const _t0 = project[j - 1];
            if (new Date(_t1.createdAt).getTime() > new Date(_t0.createdAt).getTime()) {
                project[j] = _t0;
                project[j - 1] = _t1;
            }
            else {
            }
        }
    }
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
});
exports.fetchProjectLimit = fetchProjectLimit;
const delProject = (next, req) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield Project_1.default.findOne({ where: { id: req.params.id } });
    const img = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, "../../../uploads"));
    img.map((value) => {
        if ((fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image) !== null) {
            if (fetch === null || fetch === void 0 ? void 0 : fetch.dataValues.image.includes(value)) {
                fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
            }
        }
    });
    const del = yield (Project_1.default === null || Project_1.default === void 0 ? void 0 : Project_1.default.destroy({ where: { id: req.params.id } }));
    return del;
});
exports.delProject = delProject;
const delete_single_image = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rmv = req.params.id;
    yield Project_1.default.update({ image: sequelize_1.Sequelize.fn("array_remove", sequelize_1.Sequelize.col("image"), rmv) }, { where: { isProject: "active" } });
    const files = fs_1.default.readdirSync((0, path_1.resolve)(__dirname, '../../../uploads'));
    files.map((value) => {
        if (value === rmv) {
            fs_1.default.unlinkSync((0, path_1.resolve)(__dirname, `../../../uploads/${value}`));
        }
    });
});
exports.delete_single_image = delete_single_image;
//# sourceMappingURL=project.services.js.map