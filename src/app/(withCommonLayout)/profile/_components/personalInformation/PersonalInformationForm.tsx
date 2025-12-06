/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { personalInfoSchema } from "../ZodSchema";
import { bloodOptions, genderOptions, maritalOptions } from "../ProfileData";
import { useUser } from "@/context/UserContext";
import { createPersonalInfo, fetchPersonalInfo } from "@/services/StudentsServices";
import { showToast } from "@/components/resuble_toast/toast";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

type TPersonalInfo = z.infer<typeof personalInfoSchema>;

type Props = {
  onNext: (data: TPersonalInfo) => void;
};

const PersonalInformationForm = ({ onNext }: Props) => {
  
  const { user } = useUser();
  const [loading, setLoading] = useState(true); 

  const methods = useForm<TPersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: "all",
    defaultValues: {
      Name: "",
      NAME_BN: "",
      Father: "",
      Mother: "",
      Dob: "",
      Gender: "",
      BloodGroup: "",
      MaritalStatus: "",
      Religion: "",
      Caste: "N/A",
      Nationality: "",
      PhoneNumber: "",
      Email: "",
    },
  });

  const { handleSubmit, control, reset, getValues, formState: { isSubmitting } } = methods;

  useEffect(() => {
    const loadPersonalInfo = async () => {
      if (!user?.gstApplicationId) return;

      const currentValues = getValues();
      if (currentValues.Name) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchPersonalInfo(user.gstApplicationId);

        if (res && res.data && res.data.length > 0) {
  const personalInfo = res.data[0].personalInfo;

 
  if (personalInfo.Dob) {
    const [day, month, year] = personalInfo.Dob.split("-");
    personalInfo.Dob = `${year}-${month}-${day}`;
  }


  reset(personalInfo);
}
      } catch (err) {
        console.error("Error fetching personal info:", err);
        showToast("Error fetching personal info!", "error");
      } finally {
        setLoading(false);
      }
    };

    loadPersonalInfo();
  }, [user, reset, getValues]);

  const onSubmit: SubmitHandler<TPersonalInfo> = async (data) => {
    try {
      const personalInfoPayload = {
        gstApplicationId: user?.gstApplicationId || "",
        ...data,
      };

      onNext(data);

      const res = await createPersonalInfo(personalInfoPayload);

      if (res.success) {
        showToast("Submitted successfully!", "success");
      } else {
        showToast(res.message || "Submission failed!", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Something went wrong!", "error");
    }
  };

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
}
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-center text-2xl font-semibold text-[#01327a] mb-6">
        ব্যক্তিগত তথ্য / Personal Information
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput name="Name" label="শিক্ষার্থীর নাম / Student's Name*" placeholder="Enter student's name in English" 
            disabled={true}
            control={control} />
            <Cinput name="NAME_BN" label="শিক্ষার্থীর নাম (বাংলায়)* / Student's Name in Bengali" placeholder="বাংলায় লিখুন" control={control} />
            <Cinput name="Father" label="পিতার নাম / Father's Name*" placeholder="Enter father's name" 
            disabled={true}
            control={control} />
            <Cinput name="Mother" label="মাতার নাম / Mother's Name*" placeholder="Enter mother's name" 
            disabled={true}
            control={control} />
            <Cinput name="Dob" label="জন্ম তারিখ / Date of Birth*" type="date"  disabled={true} control={control} 
            
            />
            <Cselect name="Gender" label="লিঙ্গ / Gender*" placeholder="Select Gender" options={genderOptions} control={control} disabled={true} />
            <Cselect name="BloodGroup" label="রক্তের গ্রুপ / Blood Group*" placeholder="Select Blood Group" options={bloodOptions} control={control} />
            <Cselect name="MaritalStatus" label="বৈবাহিক অবস্থা / Marital Status*" placeholder="Select Marital Status" options={maritalOptions} control={control} />
            <Cinput name="Religion" label="ধর্ম / Religion*" placeholder="Enter religion" control={control} />
            <Cinput name="Caste" label="সম্প্রদায় / Caste" placeholder="Enter caste" control={control} />
            <Cinput name="Nationality" label="জাতীয়তা / Nationality*" placeholder="Nationality" control={control} />
            <Cinput name="PhoneNumber" label="শিক্ষার্থীর মোবাইল নম্বর / Student's Mobile Number*" placeholder="Enter mobile number" control={control} />
            <Cinput name="Email" label="শিক্ষার্থীর ইমেইল / Student's Email*" placeholder="Enter email address" control={control} />
          </div>

          <div className="flex justify-center pt-6">
            <Button type="submit" className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Save & Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalInformationForm;
