"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = __importDefault(require("../../modules/project/project.controller"));
const multer_1 = require("../../middleware/multer");
const auth_1 = require("../../middleware/auth");
const photo = multer_1.upload.array("image", 4);
const router = express_1.default.Router();
router.post("/new_project", auth_1.auth, photo, project_controller_1.default.new_project);
router.put("/upd_project/:id", auth_1.auth, project_controller_1.default.upd_project);
router.put("/upd_project_img/:id", photo, project_controller_1.default.upd_project_img);
router.get("/curr_project/:id", project_controller_1.default.single_project);
router.get("/fetch_project", project_controller_1.default.fetch_project);
router.get("/fetch_project_client", project_controller_1.default.fetch_project_client);
router.get("/fetch_project_limit", project_controller_1.default.fetch_project_limit);
router.delete("/delete_project/:id", auth_1.auth, project_controller_1.default.delete_project);
router.delete("/delete_project_img/:id", project_controller_1.default.delete_project_image);
exports.default = router;
//# sourceMappingURL=project.route.js.map