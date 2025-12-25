/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

const SubmitForm = ({ result, res2 }: any) => {
  // console.log(res2.data,"pdf Data")
  // console.log(result,"result")
  const { user } = useUser();
  const rawStudent = res2.data[0];

  const pdfData = {
    Name: rawStudent.personalInfo?.Name,
    NAME_BN: rawStudent.personalInfo?.NAME_BN,
    Father: rawStudent.personalInfo?.Father,
    Mother: rawStudent.personalInfo?.Mother,
    Dob: rawStudent.personalInfo?.Dob,
    Gender: rawStudent.personalInfo?.Gender,
    BloodGroup: rawStudent.personalInfo?.BloodGroup,
    MaritalStatus: rawStudent.personalInfo?.MaritalStatus,
    Religion: rawStudent.personalInfo?.Religion,
    Nationality: rawStudent.personalInfo?.Nationality,
    PhoneNumber: rawStudent.personalInfo?.PhoneNumber,
    Email: rawStudent.personalInfo?.Email,
    Village: rawStudent.Address?.Village,
    PostOffice: rawStudent.Address?.PostOffice,
    PostCode: rawStudent.Address?.PostCode,
    Thana: rawStudent.Address?.Thana,
    District: rawStudent.Address?.District,
    Country: rawStudent.Address?.Country,
    NID: rawStudent.Address?.NID,
    PresentAddress: rawStudent.Address?.PresentAddress,
    GuardianName: rawStudent.Guardian?.GuardianName,
    GuardianRelation: rawStudent.Guardian?.GuardianRelation,
    GuardianOccupation: rawStudent.Guardian?.GuardianOccupation,
    GuardianMonthlyIncome: rawStudent.Guardian?.GuardianMonthlyIncome,
    GuardianPhone: rawStudent.Guardian?.GuardianPhone,
    SSCBoard: rawStudent.EducationalInfo?.SSCBoard,
    SSCInstitution: rawStudent.EducationalInfo?.SSCInstitution,
    SSCYear: rawStudent.EducationalInfo?.SSCYear,
    SSCRoll: rawStudent.EducationalInfo?.SSCRoll,
    SSCGpa: rawStudent.EducationalInfo?.SSCGpa,
    SSCSubject: rawStudent.EducationalInfo?.SSCSubject,

    HSCBoard: rawStudent.EducationalInfo?.HSCBoard,
    HSCInstitution: rawStudent.EducationalInfo?.HSCInstitution,
    HSCYear: rawStudent.EducationalInfo?.HSCYear,
    HSCRoll: rawStudent.EducationalInfo?.HSCRoll,
    HSCGpa: rawStudent.EducationalInfo?.HSCGpa,
    HSCSubject: rawStudent.EducationalInfo?.HSCSubject,
    Department: rawStudent.OthersInfo?.Department,
    Program: rawStudent.OthersInfo?.Program,
    HallName: rawStudent.OthersInfo?.HallName,
    Merit: rawStudent.OmrResult?.Position,
    Unit: rawStudent.unit,
  };

  console.log(pdfData)

  return <div></div>;
};

export default SubmitForm;
