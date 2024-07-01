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
  en?: string;
  km?: string;
  phoneNumber?: string;
}
export interface QueryCourse {
  courseName?: string;
  professorName?: string;
}

export interface FilterQuery {
  startDate?: Date;
  endDate?: Date;
}
