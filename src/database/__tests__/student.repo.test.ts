import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { StudentRepository } from "../repositories/student.repo";
import { IStudent } from "../model/@types/student.type";
import { StudentModel } from "../model/student.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

describe("StudentRepository Integration Tests", () => {
  let studentRepo: StudentRepository;

  beforeAll(() => {
    studentRepo = new StudentRepository();
  });

  describe("createStudent", () => {
    it("should create a student successfully", async () => {
      const studentData: IStudent = {
        fullName: {
          en: "Test student",
          km: "Test student",
        },
        DOB: new Date("2024-07-01"),
        gender: "Male",
        phoneNumber: "0987654321",
        isDeleted: false,
        courseEnrolled: [],
      };

      const result = await studentRepo.createStudent(studentData);

      expect(result).toMatchObject(studentData);
      const studentInDb = await StudentModel.findById(result._id);
      expect(studentInDb).toMatchObject(studentData);
    });

    it("should throw an error if create fails", async () => {
      const invalidStudentData = {
        fullName: {
          en: "te",
        },
      } as unknown as IStudent;

      await expect(
        studentRepo.createStudent(invalidStudentData)
      ).rejects.toThrow();
    });
  });
});
