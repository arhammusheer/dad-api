"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_routes_1 = __importDefault(require("./api.routes"));
const api_routes_2 = __importDefault(require("./api.routes"));
const routes = (0, express_1.Router)();
routes.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
routes.use("/api", api_routes_1.default);
// routes.use("/auth", authRoutes);
// routes.use("/dashboard", dashboardRoutes);
api_routes_2.default.get("/", (req, res) => {
    res.send("Hello World");
});
exports.default = routes;
//# sourceMappingURL=index.js.map