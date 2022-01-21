"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Content_model_1 = __importDefault(require("../models/Content.model"));
class PickupController {
    random(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement pagination
            const count = parseInt(req.query.count) || 1;
            if (count > 10) {
                return res.status(400).json({
                    message: "Count must be less than 10. You can always upgrade your plan.",
                });
            }
            const pickup = yield Content_model_1.default.aggregate([
                { $match: { type: "pickup" } },
                { $sample: { size: count } },
            ]);
            res.json({
                pickup,
            });
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization !== process.env.API_KEY) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            try {
                const pickup = yield Content_model_1.default.create({
                    type: "pickup",
                    content: req.body.joke,
                });
                res.json(pickup);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: "Duplicate key found",
                });
            }
        });
    }
}
exports.default = PickupController;
//# sourceMappingURL=pickup.controller.js.map