import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import loggerMiddleware from "./middlewares/logger-handler";
// import { studentRoutes } from "./routes/student.routes";
import bodyParser from "body-parser";
import { studentRoutes } from "./routes/student.routes";
import { courseRoutes } from "./routes/course.route";

export const app = express();

// Get the Configs!
// const config = getConfig(process.env.NODE_ENV);
app.use(express.json());
// Use body-parser to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
app.use("/students", studentRoutes);
app.use("/course", courseRoutes);
app.use(loggerMiddleware);

// Global Error Handler
app.use(errorHandler);
