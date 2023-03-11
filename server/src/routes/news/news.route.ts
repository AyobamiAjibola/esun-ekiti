import express from "express";
import newsController from "../../modules/news/news.controller";
import { upload } from "../../middleware/multer";
import { auth } from "../../middleware/auth";
import { roleCheck } from "../../middleware/roleCheck";

const photo = upload.array("image", 4);
const router = express.Router();

//= ============================== NEWS =================================//
router.post("/new_news", auth, photo, newsController.new_news);

router.put("/upd_news/:id", auth, newsController.upd_news);

router.put("/upd_news_img/:id", photo, newsController.upd_news_img);

router.put("/upd_news_valid/:id", auth, roleCheck(['admin']), newsController.valid_news);

router.get("/curr_news/:id", newsController.single_news);

router.get("/fetch_news_active", newsController.fetch_news_active);

router.get("/fetch_news_limit", newsController.fetch_news_limit);

router.get("/fetch_news_all", auth, newsController.fetch_news_all);

router.delete("/delete_news/:id", auth, newsController.delete_news);

router.delete("/delete_news_img/:id", newsController.delete_news_image);

export default router;
