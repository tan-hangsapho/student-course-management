import { StudentService } from "src/services/student.service";
import { Request, Response } from "express";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";
import CustomError from "src/errors/custom-error";

export class StudentController {
  private stdService: StudentService;
  constructor() {
    this.stdService = new StudentService();
  }
  async createStudent(req: Request, res: Response) {
    try {
      await this.stdService.createStudent(req.body);
      return res
        .status(StatusCode.Created)
        .json({ message: "Student create successfully" });
    } catch (error: unknown | any) {
      logger.error("Error creating student:", error);
      return res
        .status(StatusCode.InternalServerError)
        .json({ message: "Failed to create student", error: error.message });
    }
  }
  async getStudentById(req: Request, res: Response) {
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
  }
  async updateStudent(req: Request, res: Response) {
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
  }
  async deleteStudent(req: Request, res: Response) {
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
  }
}
