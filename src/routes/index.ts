import { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

import dashboardRoutes from "./dashboard.routes";
import apiRoutes from "./api.routes";
import authRoutes from "./auth.routes";

const routes = Router();

routes.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
})

routes.use("/", dashboardRoutes);
routes.use("/api", apiRoutes);
routes.use("/auth", authRoutes);

export default routes;
