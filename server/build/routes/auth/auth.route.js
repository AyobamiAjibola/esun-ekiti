"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../modules/auth/auth.controller"));
const router = express_1.default.Router();
router.post("/login_admin", auth_controller_1.default.login_admin);
router.post("/login_user", auth_controller_1.default.login_user);
router.get("/new_token", auth_controller_1.default.new_access_token);
router.get("/logout", auth_controller_1.default.logout_user);
exports.default = router;
//# sourceMappingURL=auth.route.js.map