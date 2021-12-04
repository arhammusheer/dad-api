import { Router } from "express";
import JokeController from "../controllers/joke.controller";
import PickupController from "../controllers/pickup.controller";

const router = Router();
const pickupController = new PickupController();
const jokeController = new JokeController();

router.get("/joke", jokeController.random);
router.post("/joke", jokeController.create);

router.get("/pickup", pickupController.random);
router.post("/pickup", pickupController.create);

export default router;


