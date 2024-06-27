export interface ICourse {
  studentEnrolled?: string[];
  courseName: string;
  professorName: string;
  limitNumberOfStudents: number;
  startDate: Date;
  endDate: Date;
  isDeleted?: boolean;
}
