import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
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
    studentEnrolled: [{ type: mongoose.Schema.ObjectId, ref: "Student" }],
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

export const CourseModel = mongoose.model("Course", CourseSchema);
