
export interface IStudent {
  fullName: {
    en: string;
    km: string;
  };
  courseEnrolled: string[];
  DOB: Date;
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  isDeleted: boolean;
}
