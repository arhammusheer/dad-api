"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apikey_controller_1 = __importDefault(require("../controllers/apikey.controller"));
const router = (0, express_1.Router)();
const apiKeyController = new apikey_controller_1.default();
router.post("/generate-key", apiKeyController.create);
router.get("/get-all-keys", apiKeyController.getAll);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map