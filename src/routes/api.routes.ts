import { Router } from "express";
import ApiController from "../controllers/pickup.controller";

const router = Router();
const controller = new ApiController();

router.get("/", controller.index);

export default router;
