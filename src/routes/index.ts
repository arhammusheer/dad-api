import { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

import apiRoutes from "./api.routes";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";

const routes = Router();

routes.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
})


routes.use("/api", apiRoutes);
// routes.use("/auth", authRoutes);
// routes.use("/dashboard", dashboardRoutes);

export default routes;
