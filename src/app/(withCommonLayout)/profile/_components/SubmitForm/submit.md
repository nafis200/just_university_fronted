const rawStudent = backendData[0]; // প্রথম student

const pdfData = {
  // ===== Personal Info =====
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

  // ===== Address =====
  Village: rawStudent.Address?.Village,
  PostOffice: rawStudent.Address?.PostOffice,
  PostCode: rawStudent.Address?.PostCode,
  Thana: rawStudent.Address?.Thana,
  District: rawStudent.Address?.District,
  Country: rawStudent.Address?.Country,
  NID: rawStudent.Address?.NID,
  PresentAddress: rawStudent.Address?.PresentAddress,

  // ===== Guardian =====
  GuardianName: rawStudent.Guardian?.GuardianName,
  GuardianRelation: rawStudent.Guardian?.GuardianRelation,
  GuardianOccupation: rawStudent.Guardian?.GuardianOccupation,
  GuardianMonthlyIncome: rawStudent.Guardian?.GuardianMonthlyIncome,
  GuardianPhone: rawStudent.Guardian?.GuardianPhone,

  // ===== Education =====
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

  // ===== University Info =====
  Department: rawStudent.OthersInfo?.Department,
  Program: rawStudent.OthersInfo?.Program,
  HallName: rawStudent.OthersInfo?.HallName,

  // ===== Result =====
  Merit: rawStudent.OmrResult?.Position,
  Unit: rawStudent.unit,
};
