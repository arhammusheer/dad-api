import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/token", userController.getToken);

export default router;
