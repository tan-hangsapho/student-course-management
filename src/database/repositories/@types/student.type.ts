export interface StudentUpdate{
    fullName: {
        en: string;
        km: string;
      };
      dateOfBirth: Date;
      gender: "Male" | "Female" | "Other";
      phoneNumber: string;
}