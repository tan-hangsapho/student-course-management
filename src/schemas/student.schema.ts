import mongoose from "mongoose";
import { z } from "zod";

export const StudentSchema = z.object({
  fullName: z.object({
    en: z
      .string()
      .min(5, { message: "English name must be at least 5 characters" })
      .max(30, { message: "English name must be at most 30 characters" }),
    km: z
      .string()
      .min(5, { message: "Khmer name must be at least 5 characters" })
      .max(30, { message: "Khmer name must be at most 30 characters" }),
  }),
  DOB: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must be numeric" })
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(20, { message: "Phone number must be at most 20 digits" }),
  isDeleted: z.boolean().optional().default(false),
  courseEnrolled: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId format",
      })
    )
    .optional(),
});
