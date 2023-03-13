"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
const morgan_1 = __importDefault(require("morgan"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const appError_1 = __importDefault(require("./appError"));
const response_codes_1 = require("../constants/response-codes");
const error_controller_1 = __importDefault(require("./error/error.controller"));
const endpoint_1 = __importDefault(require("../endpoint/endpoint"));
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
exports.corsOptions = {
    origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        process.env.ADMIN_PORTAL
    ],
    credentials: true,
};
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)(exports.corsOptions));
    app.use((0, helmet_1.default)({ crossOriginEmbedderPolicy: false }));
    app.use("/uploads", express_1.default.static("uploads"));
    (0, endpoint_1.default)(app);
    if (process.env.NODE_ENV === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    else {
        (0, morgan_body_1.default)(app);
    }
    app.all("*", (req, res, next) => {
        next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, response_codes_1.RESOURCE_NOT_FOUND));
    });
    app.use(error_controller_1.default);
    return app;
};
exports.default = createServer;
//# sourceMappingURL=server.js.map