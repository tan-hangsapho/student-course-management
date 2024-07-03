export interface IStudent {
  fullName: {
    en: string;
    km: string;
  };
  DOB: string;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  courseEnrolled?: string[];
  isDeleted?: boolean;
}
