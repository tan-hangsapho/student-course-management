import { IStudent } from "../database/model/@types/student.type";
import { StudentUpdate } from "../database/repositories/@types/student.type";
import { StudentRepository } from "../database/repositories/student.repo";

export class StudentService {
  private stdRepo: StudentRepository;
  constructor() {
    this.stdRepo = new StudentRepository();
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
  async findStudentByQueries(query: string) {
    try {
      return await this.stdRepo.search(query);
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
}
