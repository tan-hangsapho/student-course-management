import { Router } from "express";
import { StudentController } from "src/controllers/student.controller";

export const studentRoutes = Router();
const studentController = new StudentController();
studentRoutes.post("/", studentController.createStudent);
studentRoutes.get("/:id", studentController.getStudentById);
studentRoutes.put("/:id", studentController.updateStudent);
studentRoutes.delete("/:id", studentController.deleteStudent);
