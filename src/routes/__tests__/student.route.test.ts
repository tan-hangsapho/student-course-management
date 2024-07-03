import request from "supertest";
import { StatusCode } from "src/utils/consts/status-code"; // Adjust the path according to your file structure
import { app } from "src/app";
// import { StudentController } from "src/controllers/student.controller";

// const studentController = new StudentController();

describe("Student Routes", () => {
  // it("should create a student", async () => {
  //   jest.setTimeout(50000); // Set timeout to 20 seconds

  //   const studentData: IStudent = {
  //     fullName: {
  //       en: "Test student",
  //       km: "Test student",
  //     },
  //     DOB: "07-01-1990",
  //     gender: "Male",
  //     phoneNumber: "0987654321",
  //   };

  //   const response = await request(app)
  //     .post("/students")
  //     .send(studentData)
  //     .expect(StatusCode.Created);

  //   expect(response.body).toHaveProperty("message", "Create Success");
  //   expect(response.body).toHaveProperty("data");
  // });

  it("should return error when creating a student with missing fields", async () => {
    const studentData = {
      fullName: "John Doe",
    };

    const response = await request(app).post("/students").send(studentData);

    expect(response.status).toBe(StatusCode.BadRequest);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  //   it("should search for students", async () => {
  //     const response = await request(app)
  //       .get("/students/search")
  //       .query({ fullName: "John Doe" });

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Search Student successfully"
  //     );
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error for invalid search query", async () => {
  //     const response = await request(app)
  //       .get("/students/search")
  //       .query({ invalidField: "invalid" });

  //     expect(response.status).toBe(StatusCode.BadRequest);
  //     expect(response.body).toHaveProperty("message", "Error query Student");
  //   });

  //   it("should get a student report", async () => {
  //     const response = await request(app).get("/students/report");

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty("message", "Get Report Sucessfully");
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error when no students found for report", async () => {
  //     // Mock the controller to return no data
  //     jest.spyOn(studentController, "getStudentReport").mockResolvedValueOnce([]);

  //     const response = await request(app).get("/students/report");

  //     expect(response.status).toBe(StatusCode.NotFound);
  //     expect(response.body).toHaveProperty("message", "No student found");
  //   });

  //   it("should get a student by ID", async () => {
  //     const response = await request(app).get("/students/1");

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty("message", "Get Student Successfully");
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error for non-existent student ID", async () => {
  //     const response = await request(app).get("/students/999");

  //     expect(response.status).toBe(StatusCode.NotFound);
  //     expect(response.body).toHaveProperty("message", "Student not found");
  //   });

  //   it("should update a student by ID", async () => {
  //     const updateData = {
  //       fullName: "Jane Doe",
  //       phoneNumber: "0987654321",
  //     };

  //     const response = await request(app).patch("/students/1").send(updateData);

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Update student successfully"
  //     );
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error when updating student with invalid data", async () => {
  //     const updateData = {
  //       fullName: "", // Invalid data
  //     };

  //     const response = await request(app).patch("/students/1").send(updateData);

  //     expect(response.status).toBe(StatusCode.BadRequest);
  //     expect(response.body).toHaveProperty("message");
  //   });

  //   it("should delete a student by ID", async () => {
  //     const response = await request(app).delete("/students/1");

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Delete Student Successfully"
  //     );
  //   });

  //   it("should return error for non-existent student ID on delete", async () => {
  //     const response = await request(app).delete("/students/999");

  //     expect(response.status).toBe(StatusCode.NotFound);
  //     expect(response.body).toHaveProperty("message", "Student not found");
  //   });

  //   it("should register a student to a course", async () => {
  //     const response = await request(app).post("/students/1/register/101");

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Student registered course successfully"
  //     );
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error for invalid student or course ID on register", async () => {
  //     const response = await request(app).post("/students/999/register/999");

  //     expect(response.status).toBe(StatusCode.NotFound);
  //     expect(response.body).toHaveProperty("message");
  //   });

  //   it("should remove a student from a course", async () => {
  //     const response = await request(app).post("/students/1/remove/101");

  //     expect(response.status).toBe(StatusCode.OK);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Student remove course successfully"
  //     );
  //     expect(response.body).toHaveProperty("data");
  //   });

  //   it("should return error for invalid student or course ID on remove", async () => {
  //     const response = await request(app).post("/students/999/remove/999");

  //     expect(response.status).toBe(StatusCode.NotFound);
  //     expect(response.body).toHaveProperty("message");
  //   });
  // });
});
