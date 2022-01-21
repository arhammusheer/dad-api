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
const fs_1 = require("fs");
const path_1 = require("path");
const jsonwebtoken_1 = require("jsonwebtoken");
const Apikey_model_1 = __importDefault(require("../models/Apikey.model"));
const uuid_1 = require("uuid");
const PUBLIC_KEY = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../../keys/public.key"));
class ApikeyController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.cookies.token || req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            token = token.replace("Bearer ", "");
            console.log(token);
            console.log((0, uuid_1.v4)());
            try {
                const decoded = (0, jsonwebtoken_1.verify)(token, PUBLIC_KEY, { algorithms: ["RS256"] });
                const apikey = yield Apikey_model_1.default.create({
                    user_id: decoded.user.id,
                    key: (0, uuid_1.v4)(),
                });
                res.json(apikey);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: "Token is invalid",
                });
            }
            next();
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.cookies.token || req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            token = token.replace("Bearer ", "");
            try {
                const decoded = (0, jsonwebtoken_1.verify)(token, PUBLIC_KEY, { algorithms: ["RS256"] });
                const apikeys = yield Apikey_model_1.default.find({
                    user_id: decoded.user.id,
                });
                res.json(apikeys);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: "Token is invalid",
                });
            }
            next();
        });
    }
}
exports.default = ApikeyController;
//# sourceMappingURL=apikey.controller.js.map