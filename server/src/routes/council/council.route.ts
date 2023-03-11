import express from "express";
import councilController from "../../modules/council/council.controller";
import { upload } from "../../middleware/multer";
import { auth } from "../../middleware/auth";

const photo = upload.single("image");
const router = express.Router();

//= ============================== OBA =================================//
router.post("/new_oba", auth, photo, councilController.new_oba);

router.put("/upd_oba", photo, councilController.upd_oba);

router.get("/curr_oba/:id", councilController.single_oba);

router.get("/fetch_oba", councilController.fetch_oba);

router.delete("/delete_oba", auth, councilController.delete_oba);

//= ============================== OLORI =================================//
router.post("/new_olori", auth, photo, councilController.new_olori);

router.put("/upd_olori", photo, councilController.upd_olori);

router.get("/fetch_olori", councilController.fetch_olori);

router.delete("/delete_olori", auth, councilController.delete_olori);

//= ============================== CHIEFS =================================//
router.post("/new_chief", auth, councilController.new_chief);

router.put("/upd_chief/:id", auth, councilController.upd_chief);

router.put("/upd_chief_img/:id", photo, councilController.upd_chief_img);

router.get("/curr_chief/:id", councilController.single_chief);

router.get("/fetch_chief", councilController.fetch_chief);

router.get("/fetch_chief_admin", councilController.fetch_chief_admin);

router.delete("/delete_chief/:id", auth, councilController.delete_chief);

//= ============================== PAST OBA =================================//
router.post("/new_past_oba", auth, councilController.new_past_oba);

router.put("/upd_past_oba/:id", auth, councilController.upd_past_oba);

router.get("/curr_past_oba/:id", councilController.single_past_oba);

router.get("/fetch_past_oba", councilController.fetch_past_oba);

router.get("/fetch_past_oba_admin", councilController.fetch_past_oba_admin);

router.delete("/delete_past_oba/:id", auth, councilController.delete_past_oba);

export default router;
