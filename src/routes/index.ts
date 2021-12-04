import { Router } from "express";

import dashboardRoutes from "./dashboard.routes";
import apiRoutes from "./api.routes";
import authRoutes from "./auth.routes";

const routes = Router();

routes.use("/", dashboardRoutes);
routes.use("/api", apiRoutes);
routes.use("/auth", authRoutes);

export default routes;
