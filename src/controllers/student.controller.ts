import { StudentService } from "src/services/student.service";
import { Request, Response } from "express";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";
import CustomError from "src/errors/custom-error";
import { QueryParams } from "src/database/model/@types/student.type";

export class StudentController {
  private stdService: StudentService;
  constructor() {
    this.stdService = new StudentService();
  }
  createStudent = async (req: Request, res: Response) => {
    try {
      const { fullName, DOB, gender, phoneNumber } = req.body;
      // Create student data with correctly formatted date
      const studentData = {
        fullName,
        DOB,
        gender,
        phoneNumber,
      };
      await this.stdService.createStudent(studentData);
      return res
        .status(StatusCode.Created)
        .json({ message: "Student created successfully" });
    } catch (error: unknown | any) {
      logger.error("Error creating student:", error);
      return res
        .status(StatusCode.InternalServerError)
        .json({ message: "Failed to create student", error: error.message });
    }
  };
  getStudentById = async (req: Request, res: Response) => {
    try {
      const student = await this.stdService.getStudentById(req.params.id);
      return res
        .status(StatusCode.OK)
        .json({ message: "Get Student successfully", date: student });
    } catch (error: unknown | any) {
      logger.error("Error get student:", error);
      res
        .status(StatusCode.NotFound)
        .json({ message: "Failed to get student", error: error.message });
    }
  };
  queryStudent = async (req: Request, res: Response) => {
    try {
      const { fullName, phoneNumber } = req.query;

      const queryParam: QueryParams = {
        fullName:
          typeof fullName === "string"
            ? { en: fullName, km: fullName }
            : undefined,
        phoneNumber: typeof phoneNumber === "string" ? phoneNumber : undefined,
        // fullName,
        // phoneNumber,
      };
      const students = await this.stdService.findStudentByQueries(queryParam);
      return res
        .status(StatusCode.OK)
        .json({ message: "Get Student successfully", date: students });
    } catch (error: unknown | any) {
      logger.error("Error get student:", error);
      res
        .status(StatusCode.NotFound)
        .json({ message: "Failed to get student", error: error.message });
    }
  };
  updateStudent = async (req: Request, res: Response) => {
    try {
      const isStdExisted = this.stdService.getStudentById(req.params.id);
      if (!isStdExisted) {
        throw new CustomError("Student not found", StatusCode.NotFound);
      }
      const updateStd = await this.stdService.updateStudent(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCode.OK)
        .json({ message: "Update Student successfully", date: updateStd });
    } catch (error: unknown | any) {
      logger.error("Error updating student:", error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res
          .status(StatusCode.InternalServerError)
          .json({ message: "Failed to update student", error: error.message });
      }
    }
  };
  deleteStudent = async (req: Request, res: Response) => {
    try {
      const isStdExisted = this.stdService.getStudentById(req.params.id);
      if (!isStdExisted) {
        throw new CustomError("Student not found", StatusCode.NotFound);
      }
      await this.stdService.deleteStudent(req.params.id);
      return res
        .status(StatusCode.OK)
        .json({ message: "Delete student successfully" });
    } catch (error: unknown | any) {
      logger.error("Error deleting student:", error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res
          .status(StatusCode.InternalServerError)
          .json({ message: "Failed to delete student", error: error.message });
      }
    }
  };
}
