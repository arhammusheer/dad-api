import { Router } from "express";
import dashboardRoutes from "./dashboard";
import apiRoutes from "./api";
import authRoutes from "./auth";

const routes = Router();

routes.use("/", dashboardRoutes);
routes.use("/api", apiRoutes);
routes.use("/auth", authRoutes);

export default routes;
