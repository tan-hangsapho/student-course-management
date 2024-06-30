import { ICourse } from "src/database/model/@types/course.type";
import {
  CourseUpdate,
  FilterQuery,
  QueryCourse,
} from "src/database/repositories/@types/student.type";
import APIError from "src/errors/api-error";
import { CourseService } from "src/services/course.service";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";

export class CourseController {
  private courseService: CourseService;
  constructor() {
    this.courseService = new CourseService();
  }
  //create Course
  async createCourse(courseData: ICourse) {
    try {
      return await this.courseService.createCourse(courseData);
    } catch (error: unknown | any) {
      logger.error("Error search course:", error);
      throw new APIError(
        `An error occurred during search course: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  async searchCourseNameandPro(queryCourse: QueryCourse) {
    try {
      return await this.courseService.searchCourseByName(queryCourse);
    } catch (error: unknown | any) {
      logger.error("Error search course:", error);
      throw new APIError(
        `An error occurred during search course: ${error.message}`,
        error.statusCode || StatusCode.BadRequest
      );
    }
  }

  //filter course
  async filterCoursesByDate(queryDate: FilterQuery) {
    try {
      return await this.courseService.searchFilter(queryDate);
    } catch (error: unknown | any) {
      logger.error("Error search course:", error);
      throw new APIError(
        `An error occurred during search course: ${error.message}`,
        error.statusCode || StatusCode.BadRequest
      );
    }
  }
  //get course by id
  async getCourseById(courseId: string) {
    try {
      return await this.courseService.getCourseById(courseId);
    } catch (error: unknown | any) {
      logger.error("Error creating course:", error);
      throw new APIError(
        `An error occurred during create course: ${error.message}`,
        error.statusCode || StatusCode.BadRequest
      );
    }
  }

  //update course
  async updateCourse(courseId: string, updateCourse: CourseUpdate) {
    try {
      const isStdExisted = await this.getCourseById(courseId);
      if (!isStdExisted) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }

      return await this.courseService.updateCourse(courseId, updateCourse);
    } catch (error: unknown | any) {
      logger.error("Error update student:", error);
      throw new APIError(
        `An error occurred during update course: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  //get course report
  async getCoursesReport() {
    try {
      return await this.courseService.getCoursesReport();
    } catch (error: unknown | any) {
      logger.error("Error update student:", error);
      throw new APIError(
        `An error occurred during update course: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
  //delete course
  async deleteCourse(courseId: string) {
    try {
      return await this.courseService.deleteCourse(courseId);
    } catch (error: unknown | any) {
      logger.error("Error delete course:", error);
      throw new APIError(
        `An error occurred during delete course: ${error.message}`,
        error.statusCode || StatusCode.InternalServerError
      );
    }
  }
}
