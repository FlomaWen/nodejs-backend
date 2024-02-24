import { Router } from "express";
import articlesRoutes from "./articles.route";
import usersRoutes from "./users.route";
import authRoutes from "./auth.route";

const router = Router();

router.use("/articles", articlesRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

export default router;
