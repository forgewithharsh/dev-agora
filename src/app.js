import express from "express";
import cors from "cors";

const app = express();

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log(`Server is successfully listening on port 7777...`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!", err);
  });
