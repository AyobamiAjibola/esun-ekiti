import express from "express";
import historyController from "../../modules/history/history.controller";
import { upload } from "../../middleware/multer";
import { auth } from "../../middleware/auth";

const photo = upload.array("image", 4);
const router = express.Router();

//= ============================== HISTORY =================================//
router.post("/history", auth, photo, historyController.history);

router.put("/upd_history", auth, historyController.upd_history);

router.put("/upd_history_img", photo, historyController.upd_history_img);

router.get("/curr_history/:id", historyController.single_history);

router.get("/fetch_history", historyController.fetch_history);

router.delete("/delete_history/:id", auth, historyController.delete_history);

router.delete("/delete_history_img/:id", historyController.delete_history_image);

export default router;