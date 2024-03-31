"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const api_routes_1 = __importDefault(require("./api.routes"));
const routes = (0, express_1.Router)();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 3000,
    max: 5, // limit each IP to 10 requests per windowMs
});
routes.use(limiter);
routes.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
routes.use("/api", api_routes_1.default);
// routes.use("/auth", authRoutes);
// routes.use("/dashboard", dashboardRoutes);
routes.get("/", (req, res) => {
    // Serve HTML from ../tryout/index.html
    res.sendFile("index.html", { root: "src/tryout" });
});
routes.get("/style.css", (req, res) => {
    // Serve HTML from ../tryout/index.html
    res.sendFile("style.css", { root: "src/tryout" });
});
routes.get("/script.js", (req, res) => {
    // Serve HTML from ../tryout/index.html
    res.sendFile("script.js", { root: "src/tryout" });
});
exports.default = routes;
//# sourceMappingURL=index.js.map