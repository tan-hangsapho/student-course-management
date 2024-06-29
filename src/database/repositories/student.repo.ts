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
      const std = await StudentModel.create(stdData);
      return std;
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
  async findStudentByQuery(query: QueryParams) {
    try {
      const { km, en, phoneNumber } = query;

      const search: { [key: string]: any } = {};
      if (en) search["fullName.en"] = { $regex: en, $options: "i" };
      if (km) search["fullName.km"] = km;
      if (phoneNumber) search.phoneNumber = phoneNumber;

      const allStudent = await StudentModel.find(search ? search : {}).where({
        isDeleted: false,
      });

      if (allStudent.length === 0) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
      }
      return allStudent;
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
