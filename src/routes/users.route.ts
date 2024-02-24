import { Router } from "express";
import * as usersController from "../controllers/users.controller";

const router = Router();

router.post("/create", usersController.createUser);

export default router;
