"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const news_controller_1 = __importDefault(require("../../modules/news/news.controller"));
const multer_1 = require("../../middleware/multer");
const auth_1 = require("../../middleware/auth");
const roleCheck_1 = require("../../middleware/roleCheck");
const photo = multer_1.upload.array("image", 4);
const router = express_1.default.Router();
router.post("/new_news", auth_1.auth, photo, news_controller_1.default.new_news);
router.put("/upd_news/:id", auth_1.auth, news_controller_1.default.upd_news);
router.put("/upd_news_img/:id", photo, news_controller_1.default.upd_news_img);
router.put("/upd_news_valid/:id", auth_1.auth, (0, roleCheck_1.roleCheck)(['admin']), news_controller_1.default.valid_news);
router.get("/curr_news/:id", news_controller_1.default.single_news);
router.get("/fetch_news_active", news_controller_1.default.fetch_news_active);
router.get("/fetch_news_limit", news_controller_1.default.fetch_news_limit);
router.get("/fetch_news_all", auth_1.auth, news_controller_1.default.fetch_news_all);
router.delete("/delete_news/:id", auth_1.auth, news_controller_1.default.delete_news);
router.delete("/delete_news_img/:id", news_controller_1.default.delete_news_image);
exports.default = router;
//# sourceMappingURL=news.route.js.map