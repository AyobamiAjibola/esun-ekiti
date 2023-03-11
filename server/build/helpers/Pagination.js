"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
const getPagination = (page, size) => {
    const limit = size ? +size : 0;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
exports.getPagination = getPagination;
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: result } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, result, totalPages, currentPage };
};
exports.getPagingData = getPagingData;
//# sourceMappingURL=Pagination.js.map