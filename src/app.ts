import express from "express";
import { connect } from "mongoose";

import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import * as dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app = express();

async function connectToDB() {
  await connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

connectToDB();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

export default app;