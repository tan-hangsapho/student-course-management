// import { FilterQuery } from "mongoose";
import APIError from "../../errors/api-error";
import { StatusCode } from "../../utils/consts";
import { ICourse } from "../model/@types/course.type";
import { CourseModel } from "../model/course.model";
import { CourseUpdate, FilterQuery, QueryCourse } from "./@types/student.type";

export class CourseRepository {
  async createCourse(courseData: ICourse) {
    try {
      const std = await CourseModel.create(courseData);
      return std;
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string) {
    try {
      return await CourseModel.findById(id).where({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }
  async searchCoursesByNameOrProfessor(queryCourse: QueryCourse) {
    try {
      const { query } = queryCourse;
      if (!query) {
        throw new APIError(
          "At least one query parameter (courseName or professorName) is required",
          StatusCode.BadRequest
        );
      }

      // Define patterns to recognize English and Khmer queries
      const patterns = {
        english: /^[a-zA-Z0-9\s\+\-\*\&\^\%\$#@!]+$/,
        khmer: /^[\u1780-\u17FF\s]+$/,
      };

      // Escaping special characters in query
      const escapeSpecialChars = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
      };

      const escapedQuery = escapeSpecialChars(query);
      console.log(`Escaped Query: ${escapedQuery}`);

      const searchConditions: { [key: string]: any } = {
        courseNameEnglish: {
          courseName: { $regex: escapedQuery, $options: "i" },
        },
        courseNameKhmer: {
          courseName: { $regex: escapedQuery, $options: "i" },
        },
        professorNameEnglish: {
          professorName: { $regex: escapedQuery, $options: "i" },
        },
        professorNameKhmer: {
          professorName: { $regex: escapedQuery, $options: "i" },
        },
      };

      let search = null;
      if (patterns.english.test(query)) {
        search = {
          $or: [
            searchConditions.courseNameEnglish,
            searchConditions.professorNameEnglish,
          ],
        };
      } else if (patterns.khmer.test(query)) {
        search = {
          $or: [
            searchConditions.courseNameKhmer,
            searchConditions.professorNameKhmer,
          ],
        };
      } else {
        throw new APIError(
          "Query could not find any valid value",
          StatusCode.BadRequest
        );
      }

      const allCourses = await CourseModel.find({
        ...search,
      }).where({ isDeleted: false });

      if (!allCourses.length) {
        throw new APIError(
          "No courses found matching the query",
          StatusCode.BadRequest
        );
      }

      return allCourses;
    } catch (error: unknown | any) {
      // logger.error(
      //   `An error occurred in searchCoursesByNameOrProfessor: ${error}`
      // );
      throw error;
    }
  }

  async filterCoursesByDateRange(queryDate: FilterQuery) {
    try {
      const { startDate, endDate } = queryDate;
      const filterConditions: { [key: string]: any } = { isDeleted: false };
      if (startDate)
        filterConditions.startDate = { $gte: startDate, $options: "i" };
      if (endDate)
        filterConditions.endDate = {
          $lte: endDate,
          $options: "i",
        };
      const allCourse = await CourseModel.find(filterConditions);
      if (allCourse.length === 0) {
        throw new APIError("Course can not Found", StatusCode.BadRequest);
      }
      return allCourse;
    } catch (error) {
      throw error;
    }
  }
  async findCoursesReport() {
    try {
      const courses = await CourseModel.find({ isDeleted: false })
        .select(
          "courseName professorName startDate endDate limitNumberOfStudents studentEnrolled"
        )
        .populate("studentEnrolled", "fullName");

      const report = courses.map((course) => ({
        courseName: course.courseName,
        professorName: course.professorName,
        startDate: course.startDate,
        endDate: course.endDate,
        limitNumberOfStudents: course.limitNumberOfStudents,
        numberOfRegisteredStudents: course.studentEnrolled.length,
      }));

      return report;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, courseData: CourseUpdate) {
    try {
      console.log("Updating course with ID:", id);
      console.log("Update data:", courseData);
      const isExisting = await this.findById(id);
      console.log("Existing Course", isExisting);
      if (!isExisting) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        id,
        courseData,
        {
          new: true,
          runValidators: true,
        }
      ).where({ isDeleted: false });
      if (!updatedCourse) {
        throw new Error("Course not found");
      }
      return updatedCourse;
    } catch (error) {
      throw error;
    }
  }
  async softDelete(id: string) {
    try {
      const isExisting = await this.findById(id);
      if (!isExisting) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return await CourseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
