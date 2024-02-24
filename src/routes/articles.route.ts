import { Router } from "express";
import * as articlesController from "../controllers/articles.controller";
import * as commentsController from "../controllers/comments.controller";
import * as middlewares from "../middlewares/auth.middlewares";
const router = Router();

router.get("/all", articlesController.getArticles);
router.get("/detail/:id", articlesController.getArticleById);
router.post(
  "/create",
  middlewares.authMiddlewareADMIN,
  articlesController.createArticle
);
router.put(
  "/update/:id",
  middlewares.authMiddlewareADMIN,
  articlesController.updateArticle
);
router.post(
  "/detail/:id/comment/create",
  middlewares.authMiddleware,
  commentsController.addCommentToArticle
);
router.put(
  "/detail/:id/comment/update/:commentId",
  middlewares.authMiddleware,
  commentsController.updateComment
);
router.delete(
  "/detail/:id/comment/delete/:commentId",
  middlewares.authMiddleware,
  commentsController.deleteComment
);
router.delete(
  "/delete/:id",
  middlewares.authMiddlewareADMIN,
  articlesController.deleteArticle
);

export default router;
