import { Router } from "express";
import { StudentController } from "src/controllers/student.controller";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "src/utils/consts/status-code";
import APIError from "src/errors/api-error";

export const studentRoutes = Router();
const studentController = new StudentController();
studentRoutes.post(
  "/",
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
studentRoutes.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.query as string;
      if (!query) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Query parameter is required" });
      }
      const students = await studentController.searchStudents({ query });
      res.json(students);
    } catch (error: unknown | any) {
      next(error);
    }
  }
);
studentRoutes.put(
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
