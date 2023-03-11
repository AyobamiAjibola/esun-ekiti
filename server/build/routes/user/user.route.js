"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../modules/user/user.controller"));
const auth_1 = require("../../middleware/auth");
const roleCheck_1 = require("../../middleware/roleCheck");
const router = express_1.default.Router();
router.post("/register_admin", user_controller_1.default.register_admin);
router.get("/current_user/:id", auth_1.auth, user_controller_1.default.single_user);
router.put("/update_user/:id", user_controller_1.default.updateUser);
router.delete("/delete_user/:id", auth_1.auth, (0, roleCheck_1.roleCheck)(["admin"]), user_controller_1.default.delete_user);
router.get("/fetch_users", auth_1.auth, (0, roleCheck_1.roleCheck)(["admin"]), user_controller_1.default.fetch_users);
exports.default = router;
//# sourceMappingURL=user.route.js.map