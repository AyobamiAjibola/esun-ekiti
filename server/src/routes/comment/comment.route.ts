import express from "express";
import * as  commentController from "../../modules/comment/comment.controller";

const router =  express.Router();

router.post("/comment_news/:id", commentController.new_comment_news);
router.post("/comment_project/:id", commentController.new_comment_project);

router.put("/news/like/:id", commentController.comment_news_like);
router.put("/project/like/:id", commentController.comment_project_like);

router.put("/news/dislike/:id", commentController.comment_news_dislike);
router.put("/project/dislike/:id", commentController.comment_project_dislike);

router.delete("/news/delete/:id", commentController.delete_comment_news);
router.delete("/project/delete/:id", commentController.delete_comment_project);

router.post("/reply/news/:id", commentController.reply_comment_news);
router.post("/reply/project/:id", commentController.reply_comment_project);

router.put("/reply/news/like/:id", commentController.reply_news_like);
router.put("/reply/project/like/:id", commentController.reply_project_like);

router.put("/reply/news/dislike/:id", commentController.reply_news_dislike);
router.put("/reply/project/dislike/:id", commentController.reply_project_dislike);

router.get("/fetch/news/:id", commentController.fetch_comment_news);
router.get("/fetch/project/:id", commentController.fetch_comment_project);


export default router;