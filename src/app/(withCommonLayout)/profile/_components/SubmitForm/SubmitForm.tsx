/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { generatePdf } from "@/services/StudentsServices";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SubmitForm = ({ result, res2 }: any) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [complain, setComplain] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
      </div>
    );
  }

  const status = result.status;
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
    Caste: rawStudent.personalInfo?.Caste,
    Nationality: rawStudent.personalInfo?.Nationality,
    PhoneNumber: rawStudent.personalInfo?.PhoneNumber,
    Email: rawStudent.personalInfo?.Email,
    Scholarships: rawStudent.OthersInfo?.Scholarships,
    StudyBreakCause: rawStudent.OthersInfo?.StudyBreakCause,
    AlreadyAdmittedInstitution:
      rawStudent.OthersInfo?.AlreadyAdmittedInstitution,
    ApplicantEmployment: rawStudent.OthersInfo?.ApplicantEmployment,

    Village: rawStudent.Address?.Village,
    PostOffice: rawStudent.Address?.PostOffice,
    PostCode: rawStudent.Address?.PostCode,
    Thana: rawStudent.Address?.Thana,
    District: rawStudent.Address?.District,
    Country: rawStudent.Address?.Country,
    NID: rawStudent.Address?.NID,
    PresentAddress: rawStudent.Address?.PresentAddress,

    GuardianName: rawStudent.Guardian?.GuardianName,
    GuardianOccupation: rawStudent.Guardian?.GuardianOccupation,
    GuardianMonthlyIncome: rawStudent.Guardian?.GuardianMonthlyIncome,
    GuardianRelation: rawStudent.Guardian?.GuardianRelation,
    GuardianVillage: rawStudent.Guardian?.GuardianVillage,
    GuardianPostOffice: rawStudent.Guardian?.GuardianPostOffice,
    GuardianPostCode: rawStudent.Guardian?.GuardianPostCode,
    GuardianThana: rawStudent.Guardian?.GuardianThana,
    GuardianDistrict: rawStudent.Guardian?.GuardianDistrict,
    GuardianCountry: rawStudent.Guardian?.GuardianCountry,
    GuardianNID: rawStudent.Guardian?.GuardianNID,
    GuardianPhone: rawStudent.Guardian?.GuardianPhone,

    LegalGuardianName: rawStudent.Guardian?.LegalGuardianName,
    LegalGuardianOccupation: rawStudent.Guardian?.LegalGuardianOccupation,
    LegalGuardianIncome: rawStudent.Guardian?.LegalGuardianIncome,
    LegalGuardianRelation: rawStudent.Guardian?.LegalGuardianRelation,
    LegalGuardianVillage: rawStudent.Guardian?.LegalGuardianVillage,
    LegalGuardianPostOffice: rawStudent.Guardian?.LegalGuardianPostOffice,
    LegalGuardianPostCode: rawStudent.Guardian?.LegalGuardianPostCode,
    LegalGuardianThana: rawStudent.Guardian?.LegalGuardianThana,
    LegalGuardianDistrict: rawStudent.Guardian?.LegalGuardianDistrict,
    LegalGuardianCountry: rawStudent.Guardian?.LegalGuardianCountry,
    LegalGuardianNID: rawStudent.Guardian?.LegalGuardianNID,
    LegalGuardianPhone: rawStudent.Guardian?.LegalGuardianPhone,

    LocalGuardianName: rawStudent.Guardian?.LocalGuardianName,
    LocalGuardianRelation: rawStudent.Guardian?.LocalGuardianRelation,
    LocalGuardianVillage: rawStudent.Guardian?.LocalGuardianVillage,
    LocalGuardianPostOffice: rawStudent.Guardian?.LocalGuardianPostOffice,
    LocalGuardianPostCode: rawStudent.Guardian?.LocalGuardianPostCode,
    LocalGuardianThana: rawStudent.Guardian?.LocalGuardianThana,
    LocalGuardianDistrict: rawStudent.Guardian?.LocalGuardianDistrict,
    LocalGuardianCountry: rawStudent.Guardian?.LocalGuardianCountry,
    LocalGuardianNID: rawStudent.Guardian?.LocalGuardianNID,
    LocalGuardianPhone: rawStudent.Guardian?.LocalGuardianPhone,

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
    Pogram: rawStudent.OthersInfo?.Program,
    HallName: rawStudent.OthersInfo?.HallName,
    Merit: rawStudent.OmrResult?.Position,
    unit: rawStudent.unit,
    Session: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
  };

  const handleDownloadPdf = async () => {
    try {
      setLoading(true);
      const res = await generatePdf(pdfData);
      if (res.success && res.blob) {
        const url = window.URL.createObjectURL(res.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "AdmissionForm.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplainSubmit = () => {
    console.log({
      gstApplicationId: user.gstApplicationId,
      complain,
    });
    setComplain("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
  
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-600 to-purple-600"></div>
          <div className="p-8">
            <h1 className="text-3xl font-normal text-gray-800 mb-2">
              ভর্তি ফর্ম সাবমিশন
            </h1>
            <p className="text-sm text-gray-600">
              আপনার তথ্য যাচাই করুন এবং প্রয়োজনীয় পদক্ষেপ গ্রহণ করুন
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-8">
            {!status ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-lg font-medium text-red-800 mb-2">
                  সময়সীমা শেষ
                </h2>
                <p className="text-sm text-red-700 leading-relaxed">
                  নির্ধারিত তারিখ শেষ হয়ে গেছে। অনুগ্রহ করে প্রশাসনের সাথে
                  যোগাযোগ করুন অথবা নিচের অভিযোগ বক্সে লিখুন।
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-lg font-medium text-green-800 mb-2">
                  সফলভাবে সম্পন্ন হয়েছে
                </h2>
                <p className="text-sm text-green-700 leading-relaxed">
                  আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে। নিচে থেকে PDF ডাউনলোড
                  করতে পারেন।
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-8">
            <h2 className="text-xl font-normal text-gray-800 mb-6">
              পরবর্তী পদক্ষেপ
            </h2>
            <div className="space-y-4">
              {status && (
                <Button
                  onClick={handleDownloadPdf}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "PDF তৈরি হচ্ছে..." : "PDF ডাউনলোড করুন"}
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-6 rounded-lg transition-colors duration-200"
                  >
                    অভিযোগ করুন
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-normal text-gray-800 mb-2">
                      অভিযোগ ফর্ম
                    </DialogTitle>
                    <p className="text-sm text-gray-600">
                      আপনার সমস্যা বা অভিযোগ বিস্তারিত লিখুন
                    </p>
                  </DialogHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Application ID
                      </label>
                      <Input
                        value={user.gstApplicationId}
                        disabled
                        className="w-full border-gray-300 bg-gray-50 text-gray-600 rounded-lg py-3 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        আপনার অভিযোগ লিখুন
                      </label>
                      <Textarea
                        placeholder="আপনার সমস্যা বা অভিযোগ এখানে বিস্তারিত লিখুন..."
                        value={complain}
                        onChange={(e) => setComplain(e.target.value)}
                        className="w-full min-h-[150px] border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        অনুগ্রহ করে আপনার সমস্যা স্পষ্টভাবে বর্ণনা করুন
                      </p>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={handleComplainSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                      >
                        অভিযোগ জমা দিন
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>কোন সমস্যা হলে প্রশাসনের সাথে যোগাযোগ করুন</p>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
