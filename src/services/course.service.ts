import { CourseRepository } from "src/database/repositories/course.repo";
import {
  CourseUpdate,
  FilterQuery,
  QueryCourse,
} from "../database/repositories/@types/student.type";
import { ICourse } from "src/database/model/@types/course.type";

export class CourseService {
  private courseRepo: CourseRepository;
  constructor() {
    this.courseRepo = new CourseRepository();
  }
  async createCourse(courseData: ICourse) {
    try {
      return await this.courseRepo.createCourse(courseData);
    } catch (error) {
      throw error;
    }
  }
  async getCourseById(courseId: string) {
    try {
      return await this.courseRepo.findById(courseId);
    } catch (error) {
      throw error;
    }
  }
  async searchCourseByName(queryCourse: QueryCourse) {
    try {
      return await this.courseRepo.searchCoursesByNameOrProfessor(queryCourse);
    } catch (error) {
      throw error;
    }
  }
  async searchFilter(queryDate: FilterQuery) {
    try {
      return await this.courseRepo.filterCoursesByDateRange(queryDate);
    } catch (error) {
      throw error;
    }
  }
  async updateCourse(courseId: string, courseData: CourseUpdate) {
    try {
      return await this.courseRepo.update(courseId, courseData);
    } catch (error) {
      throw error;
    }
  }
  async getCoursesReport() {
    try {
      return await this.courseRepo.findCoursesReport();
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(courseId: string) {
    try {
      return await this.courseRepo.softDelete(courseId);
    } catch (error) {
      throw error;
    }
  }
}
