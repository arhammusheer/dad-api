import express from "express";
import { connect } from "mongoose";

import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT: string = process.env.PORT || "3000";

async function connectToDB() {
  await connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

connectToDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
