export interface StudentUpdate {
  fullName: {
    en: string;
    km: string;
  };
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
}
export interface CourseUpdate {
  courseName: string;
  professorName: string;
  startDate: Date;
  endDate: Date;
}
