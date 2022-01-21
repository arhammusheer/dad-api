"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = require("bcrypt");
const EmailValidator = __importStar(require("email-validator"));
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
const path_1 = require("path");
const PRIVATE_KEY = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../../keys/private.key"));
const PUBLIC_KEY = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../../keys/public.key"));
class UserController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                if (!user.email || !user.password) {
                    return res.status(400).json({
                        message: "Email and password are required",
                    });
                }
                // console.log(user);
                const userExists = yield User_model_1.default.findOne({
                    email: user.email,
                });
                if (!userExists) {
                    return res.status(400).json({
                        message: "User does not exist",
                    });
                }
                const isPasswordValid = yield (0, bcrypt_1.compare)(user.password, userExists.password_hash);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        message: "Invalid email or password",
                    });
                }
                // TODO: TOTP for 2FA
                // JWT
                const payload = {
                    user: {
                        id: userExists._id,
                        email: userExists.email,
                    },
                    _2fa: false,
                };
                const token = (0, jsonwebtoken_1.sign)(payload, PRIVATE_KEY, { algorithm: "RS256" });
                console.log(token);
                res.cookie("token", token, {
                    signed: true,
                    // secure: true,
                    httpOnly: true,
                    sameSite: "strict",
                });
                return res.status(200).json({
                    token,
                    message: "User logged in successfully",
                    user: payload.user,
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                if (!user.email || !user.password) {
                    return res.status(400).json({
                        message: "Email and password are required",
                    });
                }
                if (!EmailValidator.validate(user.email)) {
                    return res.status(400).json({
                        message: "Please enter a valid email",
                    });
                }
                const userExists = yield User_model_1.default.findOne({
                    email: user.email,
                });
                if (userExists) {
                    return res.status(409).json({
                        message: "User already exists",
                    });
                }
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(user.password, salt);
                const newUser = yield User_model_1.default.create({
                    email: user.email,
                    password_hash: hashedPassword,
                });
                // JWT
                const payload = {
                    id: newUser._id,
                    email: newUser.email,
                };
                const token = (0, jsonwebtoken_1.sign)(payload, PRIVATE_KEY, { algorithm: "RS256" });
                res.cookie("token", token, {
                    // signed: true,
                    // secure: true,
                    httpOnly: true,
                    // sameSite: "strict",
                });
                return res.status(201).json({
                    message: "User created successfully",
                    user: {
                        id: newUser._id,
                        email: newUser.email,
                        created_at: newUser.created_at,
                        updated_at: newUser.updated_at,
                    },
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    totp_register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement TOTP
            try {
                const tokenValid = yield (0, jsonwebtoken_1.verify)(req.signedCookies.token, PUBLIC_KEY);
                console.log(req.signedCookies);
                if (!tokenValid) {
                    return res.status(400).json({
                        message: "Invalid token",
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                return res.status(200).json({
                    message: "User logged out successfully",
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map