import express from "express";
import eventController from "../../modules/event/event.controller";
import { auth } from "../../middleware/auth";
import { upload } from "../../middleware/multer";

const router = express.Router();
const photo = upload.array("image", 4);

//= ============================== EVENT =================================//
router.post("/new_event", auth, eventController.new_event);

router.put("/upd_event/:id", auth, eventController.upd_event);

router.put("/upd_event_img/:id", photo, eventController.upd_event_img);

router.get("/curr_event/:id", eventController.single_event);

router.get("/fetch_event", eventController.fetch_event);

router.get("/fetch_event_client", eventController.fetch_event_client);

router.delete("/delete_event/:id", auth, eventController.delete_event);

router.delete("/delete_event_img/:id", eventController.delete_event_image);

export default router;
