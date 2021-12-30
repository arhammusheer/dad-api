import { Router } from "express";
import ApikeyController from "../controllers/apikey.controller";

const router = Router();
const apiKeyController = new ApikeyController();

router.post("/generate-key", apiKeyController.create);
// router.post("/register", userController.register);

export default router;
