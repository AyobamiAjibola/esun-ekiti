import express from "express";
import projectController from "../../modules/project/project.controller";
import { upload } from "../../middleware/multer";
import { auth } from "../../middleware/auth";

const photo = upload.array("image", 4);
const router = express.Router();

//= ============================== PROJECT =================================//
router.post("/new_project", auth, photo, projectController.new_project);

router.put("/upd_project/:id", auth, projectController.upd_project);

router.put("/upd_project_img/:id", photo, projectController.upd_project_img);

router.get("/curr_project/:id", projectController.single_project);

router.get("/fetch_project", projectController.fetch_project);

router.get("/fetch_project_client", projectController.fetch_project_client);

router.get("/fetch_project_limit", projectController.fetch_project_limit);

router.delete("/delete_project/:id", auth, projectController.delete_project);

router.delete("/delete_project_img/:id", projectController.delete_project_image);

export default router;
