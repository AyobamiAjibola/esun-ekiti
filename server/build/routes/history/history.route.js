"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = __importDefault(require("../../modules/history/history.controller"));
const multer_1 = require("../../middleware/multer");
const auth_1 = require("../../middleware/auth");
const photo = multer_1.upload.array("image", 4);
const router = express_1.default.Router();
router.post("/history", auth_1.auth, photo, history_controller_1.default.history);
router.put("/upd_history", auth_1.auth, history_controller_1.default.upd_history);
router.put("/upd_history_img", photo, history_controller_1.default.upd_history_img);
router.get("/curr_history/:id", history_controller_1.default.single_history);
router.get("/fetch_history", history_controller_1.default.fetch_history);
router.delete("/delete_history/:id", auth_1.auth, history_controller_1.default.delete_history);
router.delete("/delete_history_img/:id", history_controller_1.default.delete_history_image);
exports.default = router;
//# sourceMappingURL=history.route.js.map