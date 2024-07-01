import { z } from "zod";

export const CourseUpdateSchema = z.object({
  courseName: z.string().min(4).max(50).optional(),
  professorName: z.string().min(5).max(50).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const CourseSchema = z.object({
  studentEnrolled: z.array(z.string()).optional(),
  courseName: z.string().min(5).max(50),
  professorName: z.string().min(5).max(50),
  limitNumberOfStudents: z.number().int().positive(),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format (YYYY-MM-DD)",
    })
    .refine(
      (dateStr) => {
        const parts = dateStr.split("-");
        if (parts.length !== 3) return false;
        const day = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[0], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        return !isNaN(new Date(year, month - 1, day).getTime());
      },
      { message: "Invalid date format (YYYY-MM-DD)" }
    ),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format (YYYY-MM-DD)",
    })
    .refine(
      (dateStr) => {
        const parts = dateStr.split("-");
        if (parts.length !== 3) return false;
        const day = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[0], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        return !isNaN(new Date(year, month - 1, day).getTime());
      },
      { message: "Invalid date format (YYYY-MM-DD)" }
    ),
  isDeleted: z.boolean().optional().default(false),
});
