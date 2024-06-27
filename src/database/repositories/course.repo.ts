// import { FilterQuery } from "mongoose";
import APIError from "../../errors/api-error";
import { StatusCode } from "../../utils/consts";
import { ICourse } from "../model/@types/course.type";
import { CourseModel } from "../model/course.model";
import { StudentModel } from "../model/student.model";
import { CourseUpdate } from "./@types/student.type";

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
  // async search(query: string) {
  //   try {
  //     return StudentModel.find({
  //       $or: [
  //         { fullNameEN: new RegExp(query, "i") },
  //         { phoneNumber: new RegExp(query, "i") },
  //       ],
  //       isDeleted: false,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async update(id: string, courseData: CourseUpdate) {
    try {
      const isExisting = await this.findById(id);
      if (!isExisting) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return await CourseModel.findByIdAndUpdate(id, courseData, {
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
