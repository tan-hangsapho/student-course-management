export interface IStudent {
  fullName: {
    en: string;
    km: string;
  };
  DOB: Date;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  courseEnrolled?: string[];
  isDeleted?: boolean;
}
