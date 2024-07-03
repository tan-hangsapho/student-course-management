// import { FilterQuery } from "mongoose";
import { logger } from "src/utils/logger";
import APIError from "../../errors/api-error";
import { StatusCode } from "../../utils/consts";
import { IStudent } from "../model/@types/student.type";
import { StudentModel } from "../model/student.model";
import { QueryParams, StudentUpdate } from "./@types/student.type";

export class StudentRepository {
  async createStudent(stdData: IStudent) {
    try {
      // Convert DOB from dd-mm-yyyy to Date object
      const [day, month, year] = stdData.DOB.split("-").map(Number);
      const dob = new Date(year, month - 1, day);

      // Create a new student document with converted DOB
      const studentData = {
        ...stdData,
        DOB: dob,
      };

      const std = await StudentModel.create(studentData);

      // Convert DOB back to dd-mm-yyyy format for the response
      const formattedDOB = `${String(day).padStart(2, "0")}-${String(
        month
      ).padStart(2, "0")}-${year}`;

      // Return the student with the formatted date
      return {
        ...std.toJSON(),
        DOB: formattedDOB,
      };
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string) {
    try {
      const student = await StudentModel.findById(id).where({
        isDeleted: false,
      });

      return student;
    } catch (error) {
      throw error;
    }
  }
  async findStudentByQuery(queryParam: QueryParams) {
    try {
      const { query } = queryParam;
      if (!query) {
        throw new Error("Query parameter is required");
      }
      const patterns = {
        english: /^[a-zA-Z]+$/,
        khmer: /^[\u1780-\u17FF]+$/,
        number: /^\d+$/,
      };

      const searchCriteria: { [key: string]: any } = {
        english: { "fullName.en": { $regex: query, $options: "i" } }, // Case-insensitive partial match
        khmer: { "fullName.km": query },
        number: { phoneNumber: query },
      };

      let search = null;
      if (patterns.english.test(query)) {
        search = searchCriteria.english;
      } else if (patterns.khmer.test(query)) {
        search = searchCriteria.khmer;
      } else if (patterns.number.test(query)) {
        search = searchCriteria.number;
      } else {
        throw new Error("Query does not match any valid pattern");
      }

      const students = await StudentModel.find({ ...search }).where({
        isDeleted: false,
      });

      if (!students.length) {
        throw new APIError(
          "No students found matching the query",
          StatusCode.BadRequest
        );
      }

      return students;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in findStudentByQuery(): ${error}`);
      throw error;
    }
  }
  async update(id: string, studentData: StudentUpdate) {
    try {
      const isExisting = await this.findById(id);
      if (!isExisting) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return await StudentModel.findByIdAndUpdate(id, studentData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }
  async findStudentsReport() {
    const students = await StudentModel.find({ isDeleted: false }).select(
      "fullName DOB gender phoneNumber courseEnrolled"
    );
    // .populate("courseEnrolled", "courseName");
    console.log("Populated Students Data:", students);

    const report = students.map((student) => ({
      fullName: student.fullName,
      DOB: student.DOB,
      gender: student.gender,
      phoneNumber: student.phoneNumber,
      numberOfCourses: student.courseEnrolled.length,
    }));

    console.log("Generated Report:", report);

    return report;
  }
  async findAllStudent() {
    try {
      return await StudentModel.find().where({ isDeleted: false });
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
      return await StudentModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
