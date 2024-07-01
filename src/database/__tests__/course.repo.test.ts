import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { CourseRepository } from "../repositories/course.repo";
import { ICourse } from "../model/@types/course.type";
import { CourseModel } from "../model/course.model";

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

describe("CourseRepository Integration Tests", () => {
  let courseRepo: CourseRepository;

  beforeAll(() => {
    courseRepo = new CourseRepository();
  });

  describe("createCourse", () => {
    it("should create a course successfully", async () => {
      const courseData: ICourse = {
        courseName: "Test Course",
        professorName: "Test Professor",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-08-01"),
        limitNumberOfStudents: 30,
        studentEnrolled: [],
        isDeleted: false,
      };

      const result = await courseRepo.createCourse(courseData);

      expect(result).toMatchObject(courseData);
      const courseInDb = await CourseModel.findById(result._id.toString());
      expect(courseInDb).toMatchObject(courseData);
    });

    it("should throw an error if create fails", async () => {
      const invalidCourseData = {
        courseName: "Test Course",
      } as unknown as ICourse;
      await expect(
        courseRepo.createCourse(invalidCourseData)
      ).rejects.toThrow();
    });
  });

  describe("findById", () => {
    it("should find a course by ID", async () => {
      const courseData: ICourse = {
        courseName: "Test Course",
        professorName: "Test Professor",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-08-01"),
        limitNumberOfStudents: 30,
        studentEnrolled: [],
        isDeleted: false,
      };

      const createdCourse = await courseRepo.createCourse(courseData);
      const foundCourse = await courseRepo.findById(
        createdCourse._id.toString()
      );

      expect(foundCourse).toMatchObject(courseData);
    });

    it("should return null if the course is not found", async () => {
      const foundCourse = await courseRepo.findById(
        new mongoose.Types.ObjectId().toString()
      );
      expect(foundCourse).toBeNull();
    });
  });

  describe("searchCoursesByNameOrProfessor", () => {
    it("should find courses by name or professor", async () => {
      const courseData1: ICourse = {
        courseName: "Test Course 1",
        professorName: "Professor A",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-08-01"),
        limitNumberOfStudents: 30,
        studentEnrolled: [],
        isDeleted: false,
      };
      const courseData2: ICourse = {
        courseName: "Test Course 2",
        professorName: "Professor B",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-08-01"),
        limitNumberOfStudents: 30,
        studentEnrolled: [],
        isDeleted: false,
      };

      await courseRepo.createCourse(courseData1);
      await courseRepo.createCourse(courseData2);

      const foundCoursesByName =
        await courseRepo.searchCoursesByNameOrProfessor({
          courseName: "Test Course 1",
        });
      expect(foundCoursesByName).toHaveLength(1);
      expect(foundCoursesByName[0]).toMatchObject(courseData1);

      const foundCoursesByProfessor =
        await courseRepo.searchCoursesByNameOrProfessor({
          professorName: "Professor B",
        });
      expect(foundCoursesByProfessor).toHaveLength(1);
      expect(foundCoursesByProfessor[0]).toMatchObject(courseData2);
    });

    it("should throw an error if no courses are found", async () => {
      await expect(
        courseRepo.searchCoursesByNameOrProfessor({
          courseName: "Nonexistent Course",
        })
      ).rejects.toThrow("Course cannot Found");
    });
  });
});
