"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = __importDefault(require("../../modules/event/event.controller"));
const auth_1 = require("../../middleware/auth");
const multer_1 = require("../../middleware/multer");
const router = express_1.default.Router();
const photo = multer_1.upload.array("image", 4);
router.post("/new_event", auth_1.auth, event_controller_1.default.new_event);
router.put("/upd_event/:id", auth_1.auth, event_controller_1.default.upd_event);
router.put("/upd_event_img/:id", photo, event_controller_1.default.upd_event_img);
router.get("/curr_event/:id", event_controller_1.default.single_event);
router.get("/fetch_event", event_controller_1.default.fetch_event);
router.get("/fetch_event_client", event_controller_1.default.fetch_event_client);
router.delete("/delete_event/:id", auth_1.auth, event_controller_1.default.delete_event);
router.delete("/delete_event_img/:id", event_controller_1.default.delete_event_image);
exports.default = router;
//# sourceMappingURL=event.route.js.map