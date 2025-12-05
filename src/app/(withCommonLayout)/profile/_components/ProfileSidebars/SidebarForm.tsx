/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

import { Sidebars } from "./Sidebars";
import PersonalInformationForm from "../personalInformation/PersonalInformationForm";
import ApplicantAddressForm from "../ApplicantAddress/ApplicantAddressForm";
import EducationalInformationForm from "../EducationalInformation/EducationalInformationForm";
import GuardianForm from "../GuardianInformation/GuardianForm";
import { OthersInfoForm } from "../OthersInfoformation/OthersInfoForm";
import { PdfButton } from "../pdfDownload/PdfButton";
import StudentImage from "../StudentImage/StudentImage";
import { generatePdf } from "@/services/StudentsServices";
import { showToast } from "@/components/resuble_toast/toast";

const SidebarForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [FormData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    const remainArray = completedSteps.filter((x) => x !== currentStep - 1);
    setCompletedSteps(remainArray);
  };

  const submitData = async () => {
    setIsLoading(true);

    const res = await generatePdf(FormData);

    if (res.success && res.blob) {
      const url = window.URL.createObjectURL(res.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AdmissionForm.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      showToast("PDF downloaded successfully!", "success");
    } else {
      showToast(res.message || "PDF download failed!", "error");
    }

    setIsLoading(false);
  };

  return (
  <div className="flex min-h-screen">
    
    {isLoading && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 
                      bg-white px-4 py-2 rounded-xl shadow-lg z-50">
        <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent 
                         rounded-full animate-spin"></span>
        <p className="text-sm font-medium text-gray-700">Processing PDF...</p>
      </div>
    )}

    <Sidebars currentStep={currentStep} completedSteps={completedSteps} />

    <main className="flex-1 flex justify-center items-start p-6">
      <div className="w-full p-6 shadow-lg rounded-md lg:ml-60">
        {currentStep === 0 && <PersonalInformationForm onNext={handleNext} />}
        {currentStep === 1 && (
          <ApplicantAddressForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 2 && (
          <EducationalInformationForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <GuardianForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 4 && (
          <OthersInfoForm onNext={handleNext} onPrev={handlePrev} />
        )}

        {/* ❌ StudentImage removed */}
        {/* currentStep === 5 — removed */}

        {currentStep === 5 && (
          <PdfButton
            onPrev={handlePrev}
            submitData={submitData}
            FormData={FormData}
          />
        )}
      </div>
    </main>
  </div>
);

};

export default SidebarForm;
