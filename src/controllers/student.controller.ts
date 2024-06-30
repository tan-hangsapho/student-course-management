import { StudentService } from "src/services/student.service";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";
import { IStudent } from "src/database/model/@types/student.type";
import APIError from "src/errors/api-error";
import {
  QueryParams,
  StudentUpdate,
} from "src/database/repositories/@types/student.type";

export class StudentController {
  private stdService: StudentService;
  constructor() {
    this.stdService = new StudentService();
  }
  //create student
  async createStudent(studentData: IStudent) {
    try {
      return await this.stdService.createStudent(studentData);
    } catch (error: unknown | any) {
      logger.error("Error creating student:", error);
      throw new APIError(
        `An error occurred during create student: ${error.message}`,
        error.statusCode || StatusCode.BadRequest
      );
    }
  }
  //get report
  async getStudentReport() {
    try {
      const studentData = await this.stdService.getStudentReport();
      return studentData;
    } catch (error) {
      throw error;
    }
  }
  //GET STUDENT BY ID
  async getStudentById(studId: string) {
    try {
      const student = await this.stdService.getStudentById(studId);
      if (student?.isDeleted === true) {
        throw new APIError("Student not found", StatusCode.NotFound);
      } else if (!student) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return student;
    } catch (error: unknown | any) {
      logger.error("Error get student:", error);
      throw new APIError(error.message, StatusCode.NotFound);
    }
  }
  //get all student
  async getAllStudent() {
    try {
      const student = await this.stdService.getAllStudent();

      return student;
    } catch (error: any) {
      logger.error("Error get student:", error);
      throw new APIError(
        `An error occurred during get student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  //searchStudent
  async searchStudents(query: QueryParams) {
    try {
      return await this.stdService.findStudentByQueries(query);
    } catch (error: any) {
      logger.error("Error search student:", error);
      throw new APIError(
        `An error occurred during search student: ${error.message}`,
        error.statusCode || StatusCode.BadRequest
      );
    }
  }
  //update student
  async updateStudent(stdId: string, updateStd: StudentUpdate) {
    try {
      const isStdExisted = await this.stdService.getStudentById(stdId);
      if (!isStdExisted) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }

      return await this.stdService.updateStudent(stdId, updateStd);
    } catch (error: unknown | any) {
      logger.error("Error update student:", error);
      throw new APIError(
        `An error occurred during update student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  //delete student
  async deleteStudent(stdId: string) {
    try {
      return await this.stdService.deleteStudent(stdId);
    } catch (error: unknown | any) {
      logger.error("Error Delete student:", error);
      throw new APIError(
        `An error occurred during Delete student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  //REGISTER STUDENT
  async registerStudent(stdId: string, courseId: string) {
    try {
      return await this.stdService.registerToCourse(stdId, courseId);
    } catch (error: unknown | any) {
      logger.error("Error registering student:", error);
      throw new APIError(
        `An error occurred during registering student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  async removeRegister(stdId: string, courseId: string) {
    try {
      return await this.stdService.removeFromCourse(stdId, courseId);
    } catch (error: unknown | any) {
      logger.error("Error registering student:", error);
      throw new APIError(
        `An error occurred during registering student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }

  async registerStudents(stdId: string, courseId: string) {
    try {
      return await this.stdService.toggleStudentEnrollment(stdId, courseId);
    } catch (error: unknown | any) {
      logger.error("Error registering student:", error);
      throw new APIError(
        `An error occurred during registering student: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
}
