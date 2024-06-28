import { ICourse } from "src/database/model/@types/course.type";
import { CourseUpdate } from "src/database/repositories/@types/student.type";
import APIError from "src/errors/api-error";
import { CourseService } from "src/services/course.service";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";

export class CourseController {
  private courseService: CourseService;
  constructor() {
    this.courseService = new CourseService();
  }
  async createCourse(courseData: ICourse) {
    try {
      return await this.courseService.createCourse(courseData);
    } catch (error: unknown | any) {
      logger.error("Error creating course:", error);
      throw new APIError(
        `An error occurred during Adding new course: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
  async getCourseById(courseId: string) {
    try {
      return await this.courseService.getCourseById(courseId);
    } catch (error: unknown | any) {
      logger.error("Error get course:", error);
      throw new APIError(error.message, StatusCode.NotFound);
    }
  }
  async updateCourse(courseId: string, updateCourse: CourseUpdate) {
    try {
      const isStdExisted = await this.getCourseById(courseId);
      if (!isStdExisted) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }

      return await this.courseService.updateCourse(courseId, updateCourse);
    } catch (error: unknown | any) {
      logger.error("Error updating course:", error);
      throw new APIError(
        "An error occurred during updating student",
        StatusCode.InternalServerError
      );
    }
  }
  async deleteCourse(courseId: string) {
    try {
      return await this.courseService.deleteCourse(courseId);
    } catch (error: unknown | any) {
      logger.error("Error deleting course:", error);

      throw new APIError(
        "An error occurred during deleting student",
        StatusCode.InternalServerError
      );
    }
  }
}
