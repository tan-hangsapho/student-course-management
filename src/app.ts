import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import loggerMiddleware from "./middlewares/logger-handler";
import { studentRoutes } from "./routes/student.routes";

export const app = express();

// Get the Configs!
// const config = getConfig(process.env.NODE_ENV);
// app.use(bodyParser.json());

app.use("/students", studentRoutes);

app.use(loggerMiddleware);

// Global Error Handler
app.use(errorHandler);
