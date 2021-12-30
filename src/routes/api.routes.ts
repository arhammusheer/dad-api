import { NextFunction, Router, Request, Response } from "express";
import JokeController from "../controllers/joke.controller";
import PickupController from "../controllers/pickup.controller";

import RequestHandler from "../middleware/request.middleware";

const router = Router();

const pickupController = new PickupController();
const jokeController = new JokeController();

router.get("/joke", jokeController.random);
router.post("/joke", jokeController.create);

router.get("/pickup", pickupController.random);
router.post("/pickup", pickupController.create);

router.all("*",(req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Not found",   
    });
    next();
});

router.use(RequestHandler);

export default router;
