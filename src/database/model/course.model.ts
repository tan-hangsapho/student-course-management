import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    studentEnrolled: [{ type: mongoose.Schema.ObjectId, ref: "Student" }],
    courseName: { type: String, require: true },
    professorName: {
      type: String,
      required: true,
    },
    limitNumberOfStudents: {
      type: Number,
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, require: true },
    isDeleted: { type: Boolean, default: false },
  },

  {
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const StudentModel = mongoose.model("Course", CourseSchema);
