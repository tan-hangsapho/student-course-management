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
    await collection.deleteMany({});
  }
});

describe("StudentRepository Integration Tests", () => {
  let studentRepo: StudentRepository;

  beforeEach(() => {
    studentRepo = new StudentRepository();
  });

  describe("createStudent", () => {
    it("should create a student successfully", async () => {
      const studentData: IStudent = {
        fullName: {
          en: "Test student",
          km: "Test student",
        },
        DOB: "07-01-1990",
        gender: "Male",
        phoneNumber: "0987654321",
      };

      // Create a student and wait for the result
      const result = await studentRepo.createStudent(studentData);

      // Assert that the result matches the input data
      if (result) {
        expect(result.fullName).toBeDefined(); // Check fullName is defined
        expect(result.fullName!.en).toBe(studentData.fullName.en);
        expect(result.fullName!.km).toBe(studentData.fullName.km);
        expect(result.gender).toBe(studentData.gender);
        expect(result.phoneNumber).toBe(studentData.phoneNumber);
      }
      // Wait for the student to be saved in the database
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust timeout if necessary

      // Retrieve the student from the database by ID
      const studentInDb = await StudentModel.findById(result._id);

      // Assert that the student found in the database matches the input data
      expect(studentInDb).toBeDefined();
      if (studentInDb) {
        expect(studentInDb.fullName).toBeDefined(); // Check fullName is defined
        expect(studentInDb.fullName!.en).toBe(studentData.fullName.en);
        expect(studentInDb.fullName!.km).toBe(studentData.fullName.km);
        expect(studentInDb.gender).toBe(studentData.gender);
        expect(studentInDb.phoneNumber).toBe(studentData.phoneNumber);
      }
    });

    it("should throw an error if create fails", async () => {
      const invalidStudentData = {
        fullName: {
          en: "te",
        },
      } as unknown as IStudent;

      // Assert that creating an invalid student data throws an error
      await expect(
        studentRepo.createStudent(invalidStudentData)
      ).rejects.toThrow();
    });
  });
});
