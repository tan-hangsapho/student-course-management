// import { FilterQuery } from "mongoose";
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
      return await StudentModel.findById(id).where({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }
  async search(queryParam: QueryParams) {
    try {
      const { query } = queryParam;
      const search: { [key: string]: any } = {
        isDeleted: false,
      };

      if (query) {
        search.$or = [
          { "fullName.en": { $regex: query, $options: "i" } },
          { "fullName.km": { $regex: query, $options: "i" } },
        ];
      }

      return await StudentModel.find(search);
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
