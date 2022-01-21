"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_routes_1 = __importDefault(require("./api.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const routes = (0, express_1.Router)();
routes.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
routes.use("/api", api_routes_1.default);
routes.use("/auth", auth_routes_1.default);
routes.use("/dashboard", dashboard_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map