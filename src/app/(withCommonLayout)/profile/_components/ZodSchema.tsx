import { z } from "zod";



export const addressSchema = z.object({
  Village: z
    .string()
    .min(1, "Village / House number / Road number is required"),
  PostOffice: z.string().min(1, "Post office is required"),
  PostCode: z.string().min(1, "Post code is required"),
  Thana: z.string().min(1, "Thana is required"),
  District: z.string().min(1, "District is required"),
  Country: z.string().min(1, "Country is required"),
  NID: z.string().min(1, "NID / Birth reg. / Passport number is required"),
  PresentAddress: z.string().min(1, "Present address is required"),
});

export const educationalSchema = z.object({
  SSCBoard: z.string().min(1, "SSC Board is required"),
  SSCInstitution: z.string().min(1, "SSC Institution is required"),
  SSCYear: z.string().min(1, "SSC Passing Year is required"),
  SSCRoll: z.string().min(1, "SSC Roll No is required"),
  SSCGpa: z.string().min(1, "SSC GPA is required"),
  SSCSubject: z.string().min(1, "SSC Subject is required"),
  HSCBoard: z.string().min(1, "HSC Board is required"),
  HSCInstitution: z.string().min(1, "HSC Institution is required"),
  HSCYear: z.string().min(1, "HSC Passing Year is required"),
  HSCRoll: z.string().min(1, "HSC Roll No is required"),
  HSCGpa: z.string().min(1, "HSC GPA is required"),
  HSCSubject: z.string().min(1, "HSC Subject is required"),
});


export const guardianSchema = z.object({
  GuardianName: z.string().min(1, "Guardian's name is required"),
  GuardianOccupation: z.string().min(1, "Guardian's occupation is required"),
  GuardianMonthlyIncome: z
    .string()
    .min(1, "Guardian's monthly income is required"),
  GuardianRelation: z.string().min(1, "Relation is required"),
  GuardianVillage: z
    .string()
    .min(1, "Village / House number / Road number is required"),
  GuardianPostOffice: z.string().min(1, "Post office is required"),
  GuardianPostCode: z.string().min(1, "Post code is required"),
  GuardianThana: z.string().min(1, "Thana is required"),
  GuardianDistrict: z.string().min(1, "District is required"),
  GuardianCountry: z.string().min(1, "Country is required"),
  GuardianNID: z
    .string()
    .min(1, "Guardian's NID / Birth reg. / Passport number is required"),
  GuardianPhone: z.string().min(1, "Guardian's mobile number is required"),

  LegalGuardianName: z.string().min(1, "Legal Guardian's name is required"),
  LegalGuardianOccupation: z.string().min(1, "Occupation is required"),
  LegalGuardianIncome: z.string().min(1, "Monthly income is required"),
  LegalGuardianRelation: z.string().min(1, "Relation is required"),
  LegalGuardianVillage: z
    .string()
    .min(1, "Village / House number / Road number is required"),
  LegalGuardianPostOffice: z.string().min(1, "Post office is required"),
  LegalGuardianPostCode: z.string().min(1, "Post code is required"),
  LegalGuardianThana: z.string().min(1, "Thana is required"),
  LegalGuardianDistrict: z.string().min(1, "District is required"),
  LegalGuardianCountry: z.string().min(1, "Country is required"),
  LegalGuardianNID: z
    .string()
    .min(1, "NID / Birth reg. / Passport number is required"),
  LegalGuardianPhone: z.string().min(1, "Mobile number is required"),

  LocalGuardianName: z.string().optional(),
  LocalGuardianRelation: z.string().optional(),
  LocalGuardianVillage: z.string().optional(),
  LocalGuardianPostOffice: z.string().optional(),
  LocalGuardianPostCode: z.string().optional(),
  LocalGuardianThana: z.string().optional(),
  LocalGuardianDistrict: z.string().optional(),
  LocalGuardianCountry: z.string().optional(),
  LocalGuardianNID: z.string().optional(),
  LocalGuardianPhone: z.string().optional(),
});


export const othersInfoSchema = z.object({
  Department: z.string().min(1, "Department is required"),
  Pogram: z.string().min(1, "Program is required"),
  HallName: z.string().min(1, "Hall Name is required"),
  StudyBreakCause: z.string().max(150, "Max 150 characters").optional(),
  AlreadyAdmittedInstitutio: z
    .string()
    .max(150, "Max 150 characters")
    .optional(),
  ApplicantEmployment: z.string().max(150, "Max 150 characters").optional(),
  Scholarships: z.string().max(150, "Max 150 characters").optional(),
});


export const personalInfoSchema = z.object({
  Name: z.string().min(1, "Student's name is required"),
  NAME_BN: z.string().min(1, "বাংলা নাম লিখুন"),
  Father: z.string().min(1, "Father's name is required"),
  Mother: z.string().min(1, "Mother's name is required"),
  Dob: z.string().min(1, "Date of birth is required"),
  Gender: z.string().min(1, "Gender is required"),
  BloodGroup: z.string().min(1, "Blood group is required"),
  MaritalStatus: z.string().min(1, "Marital status is required"),
  Religion: z.string().min(1, "Religion is required"),
  Caste: z.string().optional(),
  Nationality: z.string().min(1, "Nationality is required"),
  PhoneNumber: z.string().min(1, "Mobile number is required"),
  Email: z.string().email("Invalid email format"),
});