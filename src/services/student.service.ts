import { CourseRepository } from "src/database/repositories/course.repo";
import { IStudent } from "../database/model/@types/student.type";
import {
  QueryParams,
  StudentUpdate,
} from "../database/repositories/@types/student.type";
import { StudentRepository } from "../database/repositories/student.repo";
import mongoose from "mongoose";
import APIError from "src/errors/api-error";
import { StatusCode } from "src/utils/consts";

export class StudentService {
  private stdRepo: StudentRepository;
  private courseRepo: CourseRepository;
  constructor() {
    this.stdRepo = new StudentRepository();
    this.courseRepo = new CourseRepository();
  }
  async createStudent(studentData: IStudent) {
    try {
      return await this.stdRepo.createStudent(studentData);
    } catch (error) {
      throw error;
    }
  }
  async getStudentById(stdId: string) {
    try {
      return await this.stdRepo.findById(stdId);
    } catch (error) {
      throw error;
    }
  }
  async getStudentReport() {
    try {
      return await this.stdRepo.findStudentsReport();
    } catch (error) {
      throw error;
    }
  }
  async findStudentByQueries(query: QueryParams) {
    try {
      return await this.stdRepo.findStudentByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(stdId: string, studentData: StudentUpdate) {
    try {
      return await this.stdRepo.update(stdId, studentData);
    } catch (error) {
      throw error;
    }
  }
  async deleteStudent(stdId: string) {
    try {
      return await this.stdRepo.softDelete(stdId);
    } catch (error) {
      throw error;
    }
  }
  async toggleStudentEnrollment(stdId: string, courseId: string) {
    try {
      // Validate studentId and courseId
      if (
        !mongoose.Types.ObjectId.isValid(stdId) ||
        !mongoose.Types.ObjectId.isValid(courseId)
      ) {
        throw new APIError("Invalid ID format");
      }

      // Find course and student
      const course = await this.courseRepo.findById(courseId);
      const student = await this.stdRepo.findById(stdId);

      console.log("Course:", course);
      console.log("Student:", student);
      if (!course || !student) {
        throw new APIError("Course or student not found");
      }

      const courseObjectId = new mongoose.Types.ObjectId(courseId);
      const studentObjectId = new mongoose.Types.ObjectId(stdId);

      // Check if the student is already enrolled in the course
      const isStudentEnrolled = course.studentEnrolled.findIndex((id) =>
        id.equals(studentObjectId)
      );

      if (isStudentEnrolled !== -1) {
        // Remove student from course
        student.courseEnrolled.splice(isStudentEnrolled, 1);
        course.studentEnrolled.splice(isStudentEnrolled, 1);
        await course.save();
        await student.save();

        return {
          message: "Course removed from saves successfully",
          data: course,
        };
      } else {
        // Add student to course
        if (course.studentEnrolled.length <= course.limitNumberOfStudents) {
          course.studentEnrolled.push(studentObjectId);
          student.courseEnrolled.push(courseObjectId);

          await course.save();
          await student.save();

          return {
            message: "Course register successfully",
            data: course,
          };
        } else {
          throw new APIError("Course is full");
        }
      }
    } catch (error: any) {
      throw new APIError(
        `Error toggling student enrollment ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }

  async registerToCourse(stdId: string, courseId: string) {
    const course = await this.courseRepo.findById(courseId);
    const student = await this.stdRepo.findById(stdId);
    try {
      if (!student) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      if (!course) {
        throw new APIError("Course not found", StatusCode.NotFound);
      }

      const courseObjectId = new mongoose.Types.ObjectId(courseId);
      const studentObjectId = new mongoose.Types.ObjectId(stdId);
      if (course && student) {
        if (course.studentEnrolled.includes(studentObjectId)) {
          throw new Error("Student is already enrolled in the course");
        }

        // Check if course has reached its student limit
        if (course.studentEnrolled.length >= course.limitNumberOfStudents) {
          throw new APIError("Course is full", StatusCode.BadRequest);
        }
        course.studentEnrolled.push(studentObjectId);
        student.courseEnrolled.push(courseObjectId);
        await course.save();
        await student.save();
        return course;
      }
    } catch (error) {
      throw error;
    }
  }

  async removeFromCourse(stdId: string, courseId: string) {
    try {
      const course = await this.courseRepo.findById(courseId);
      const student = await this.stdRepo.findById(stdId);
      if (!student || !course) {
        throw new Error("Course or student not found");
      }
      const studentObjectId = new mongoose.Types.ObjectId(stdId);
      const courseObjectId = new mongoose.Types.ObjectId(courseId);

      course.studentEnrolled = course.studentEnrolled.filter(
        (student) => !student.equals(studentObjectId)
      );
      student.courseEnrolled = student.courseEnrolled.filter(
        (course) => !course.equals(courseObjectId)
      );

      await course.save();
      await student.save();
      return course;
    } catch (error) {
      throw error;
    }
  }
  async getAllStudent() {
    try {
      return await this.stdRepo.findAllStudent();
    } catch (error) {
      throw error;
    }
  }
}
