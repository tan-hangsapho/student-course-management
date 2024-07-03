import { StudentSchema } from "src/schemas/student.schema";

describe("Student Schema Validation", () => {
  it("should fail validation with invalid date format", () => {
    const invalidStudent = {
      fullName: {
        en: "John Doe",
        km: "ចិន ដូ",
      },
      DOB: "1990/01/01", // Invalid date format
      gender: "Male",
      phoneNumber: "12345678",
      isDeleted: false,
      courseEnrolled: [],
    };

    const result = StudentSchema.safeParse(invalidStudent);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toContain(
      "Invalid date format (DD-MM-YYYY)"
    );
  });

  it("should fail validation with invalid phone number format", () => {
    const invalidStudent = {
      fullName: {
        en: "John Doe",
        km: "ចិន ដូ",
      },
      DOB: "01-01-1990",
      gender: "Male",
      phoneNumber: "abc", // Invalid phone number format
      isDeleted: false,
      courseEnrolled: [],
    };

    const result = StudentSchema.safeParse(invalidStudent);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toContain(
      "Phone number must be numeric"
    );
  });
});
