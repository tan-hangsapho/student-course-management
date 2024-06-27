import APIError from "../../errors/api-error";
import { StatusCode } from "../../utils/consts";
import { IStudent, QueryParams } from "../model/@types/student.type";
import { StudentModel } from "../model/student.model";
import { StudentUpdate } from "./@types/student.type";

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
      return await StudentModel.findById(id).where({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }
  async findStudent(queryParam: QueryParams) {
    try {
      const { fullName, phoneNumber } = queryParam;
      const query: { [key: string]: any } = {};
      if (typeof fullName === "string") {
        query.fullName = { $regex: fullName, $options: "i" };
      }
      if (typeof phoneNumber === "string") {
        query.phoneNumber = { $regex: phoneNumber, $options: "i" };
      }
      const student = await StudentModel.find(query).where({
        isDeleted: false,
      });

      return student;
    } catch (error) {
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
