import { CourseRepository } from "src/database/repositories/course.repo";
import { CourseUpdate } from "../database/repositories/@types/student.type";
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
  //   async findStudentByQueries(query: string) {
  //     try {
  //       return await this.stdRepo.search(query);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async updateCourse(courseId: string, courseData: CourseUpdate) {
    try {
      return await this.courseRepo.update(courseId, courseData);
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
