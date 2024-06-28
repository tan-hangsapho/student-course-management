import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "src/utils/consts/status-code";
import APIError from "src/errors/api-error";
import { CourseController } from "src/controllers/course.controller";

export const courseRoutes = Router();
const courseController = new CourseController();
courseRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseData = req.body;
      console.log(`Course Data: ${courseData}`);
      const response = await courseController.createCourse(courseData);
      return res
        .status(StatusCode.Created)
        .send({ message: "Create Success", data: response });
    } catch (err: unknown | any) {
      next(err);
    }
  }
);
courseRoutes.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await courseController.getCourseById(req.params.id);
      return res
        .status(StatusCode.OK)
        .send({ message: "Get course Successfully", data: response });
    } catch (err: unknown | any) {
      next(err);
    }
  }
);
courseRoutes.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateStudent = await courseController.updateCourse(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCode.OK)
        .send({ message: "Update course successfully", data: updateStudent });
    } catch (error) {
      next(error);
    }
  }
);
courseRoutes.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isStdExisted = await courseController.getCourseById(req.params.id);
      if (!isStdExisted) {
        throw new APIError("Course not found", StatusCode.NotFound);
      }
      await courseController.deleteCourse(req.params.id);
      return res
        .status(StatusCode.OK)
        .send({ message: "Delete course Successfully" });
    } catch (error) {
      next(error);
    }
  }
);
