import { Router } from "express";
import { StudentController } from "src/controllers/student.controller";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "src/utils/consts/status-code";
import APIError from "src/errors/api-error";
import validateInput from "src/middlewares/validation-input";
import { StudentSchema } from "src/schemas/student.schema";

export const studentRoutes = Router();
const studentController = new StudentController();
studentRoutes.post(
  "/",
  validateInput(StudentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, DOB, gender, phoneNumber } = req.body;
      // Create student data with correctly formatted date
      const studentData = {
        fullName,
        DOB,
        gender,
        phoneNumber,
      };
      console.log("Student Data:", studentData);
      const response = await studentController.createStudent(studentData);
      return res
        .status(StatusCode.Created)
        .send({ message: "Create Success", data: response });
    } catch (err: unknown | any) {
      next(err);
    }
  }
);
studentRoutes.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const students = await studentController.searchStudents(query);
      if (!students) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Error query Student" });
      }
      res.status(StatusCode.OK).json({
        message: "Search Student successfully",
        data: students,
      });
    } catch (error: unknown | any) {
      next(error);
    }
  }
);
studentRoutes.get(
  "/report",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await studentController.getStudentReport();
      if (data.length === 0) {
        throw new APIError("No student found", StatusCode.NotFound);
      }
      return res
        .status(StatusCode.OK)
        .send({ message: "Get Report Sucessfully", data: data });
    } catch (error: unknown | any) {
      next(error);
    }
  }
);
studentRoutes.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await studentController.getStudentById(req.params.id);

      return res
        .status(StatusCode.OK)
        .send({ message: "Get Student Successfully", data: response });
    } catch (err: unknown | any) {
      next(err);
    }
  }
);

studentRoutes.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateStudent = await studentController.updateStudent(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCode.OK)
        .send({ message: "Update student successfully", data: updateStudent });
    } catch (error) {
      next(error);
    }
  }
);
studentRoutes.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isStdExisted = await studentController.getStudentById(
        req.params.id
      );
      if (!isStdExisted) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      await studentController.deleteStudent(req.params.id);
      return res
        .status(StatusCode.OK)
        .send({ message: "Delete Student Successfully" });
    } catch (error) {
      next(error);
    }
  }
);

studentRoutes.post(
  "/:stdId/enroll/:courseId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, stdId } = req.params;
      const course = await studentController.registerStudents(stdId, courseId);
      return res
        .status(StatusCode.OK)
        .json({ message: "Student registered successfully", data: course });
    } catch (error) {
      next(error);
    }
  }
);
studentRoutes.post(
  "/:stdId/register/:courseId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, stdId } = req.params;
      const course = await studentController.registerStudent(stdId, courseId);
      return res.status(StatusCode.OK).json({
        message: "Student registered course successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }
);
studentRoutes.post(
  "/:stdId/remove/:courseId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, stdId } = req.params;
      const course = await studentController.removeRegister(stdId, courseId);
      return res
        .status(StatusCode.OK)
        .json({ message: "Student remove course successfully", data: course });
    } catch (error) {
      next(error);
    }
  }
);
