export interface StudentUpdate {
  fullName: {
    en: string;
    km: string;
  };
  DOB?: Date;
  gender?: "Male" | "Female" | "Other";
  phoneNumber?: string;
}
export interface CourseUpdate {
  courseName?: string;
  professorName?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface QueryParams {
  query?: string;
}
export interface QueryCourse {
  query?: string;
}

export interface FilterQuery {
  startDate?: Date;
  endDate?: Date;
}
