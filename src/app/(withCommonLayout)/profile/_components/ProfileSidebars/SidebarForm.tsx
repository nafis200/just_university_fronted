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

const SidebarForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [FormData,setFormData] = useState<any>({});

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

  const submitData = ()=>{
     console.log("Submit Data after form")
     console.log(FormData)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebars currentStep={currentStep} completedSteps={completedSteps} />
      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full p-6 shadow-lg rounded-md lg:ml-60">
          {currentStep === 0 && <PersonalInformationForm onNext={handleNext} />}
          {currentStep === 1 && (
            <ApplicantAddressForm onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 2 && (
            <EducationalInformationForm
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 3 && (
            <GuardianForm onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 4 && (
            <OthersInfoForm onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 5 && (
            <StudentImage onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 6 && (
            <PdfButton onPrev={handlePrev} submitData={submitData}/>
          )}
        </div>
      </main>
    </div>
  );
};

export default SidebarForm;
