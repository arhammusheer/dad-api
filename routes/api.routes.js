"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joke_controller_1 = __importDefault(require("../controllers/joke.controller"));
const pickup_controller_1 = __importDefault(require("../controllers/pickup.controller"));
const router = (0, express_1.Router)();
const pickupController = new pickup_controller_1.default();
const jokeController = new joke_controller_1.default();
router.get("/joke", jokeController.random);
router.post("/joke", jokeController.create);
router.get("/pickup", pickupController.random);
router.post("/pickup", pickupController.create);
// router.use(RequestHandler);
exports.default = router;
//# sourceMappingURL=api.routes.js.map