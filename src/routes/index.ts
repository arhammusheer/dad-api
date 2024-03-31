import { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

import { rateLimit } from "express-rate-limit";

import apiRoutes from "./api.routes";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import router from "./api.routes";

const routes = Router();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 10 requests per windowMs
});

routes.use(limiter);

routes.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

routes.use("/api", apiRoutes);
// routes.use("/auth", authRoutes);
// routes.use("/dashboard", dashboardRoutes);

routes.get("/", (req: Request, res: Response) => {
  // Serve HTML from ../tryout/index.html
  res.sendFile("index.html", { root: "src/tryout" });
});

routes.get("/style.css", (req: Request, res: Response) => {
  // Serve HTML from ../tryout/index.html
  res.sendFile("style.css", { root: "src/tryout" });
});

routes.get("/script.js", (req: Request, res: Response) => {
  // Serve HTML from ../tryout/index.html
  res.sendFile("script.js", { root: "src/tryout" });
});

export default routes;
