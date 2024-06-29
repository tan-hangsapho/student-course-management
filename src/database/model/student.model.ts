import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    fullName: {
      en: { type: String, required: true },
      km: { type: String, required: true },
    },
    DOB: {
      type: Date,
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phoneNumber: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
    courseEnrolled: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],
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

export const StudentModel = mongoose.model("Student", StudentSchema);
