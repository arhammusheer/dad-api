import { Router } from "express";
import ApikeyController from "../controllers/apikey.controller";

const router = Router();
const apiKeyController = new ApikeyController();

router.post("/generate-key", apiKeyController.create);
router.get("/get-all-keys", apiKeyController.getAll);
// router.post("/register", userController.register);

export default router;
