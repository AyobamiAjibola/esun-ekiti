"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("../routes/auth/auth.route"));
const user_route_1 = __importDefault(require("../routes/user/user.route"));
const council_route_1 = __importDefault(require("../routes/council/council.route"));
const event_route_1 = __importDefault(require("../routes/event/event.route"));
const news_route_1 = __importDefault(require("../routes/news/news.route"));
const project_route_1 = __importDefault(require("../routes/project/project.route"));
const history_route_1 = __importDefault(require("../routes/history/history.route"));
const routes = (app) => {
    app.use("/auth", auth_route_1.default);
    app.use("/user", user_route_1.default);
    app.use("/council", council_route_1.default);
    app.use("/event", event_route_1.default);
    app.use("/news", news_route_1.default);
    app.use("/project", project_route_1.default);
    app.use("/history", history_route_1.default);
};
exports.default = routes;
//# sourceMappingURL=endpoint.js.map