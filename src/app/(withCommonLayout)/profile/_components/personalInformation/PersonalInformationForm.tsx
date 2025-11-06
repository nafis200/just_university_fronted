"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { personalInfoSchema } from "../ZodSchema";
import { bloodOptions, genderOptions, maritalOptions } from "../ProfileData";

type TPersonalInfo = z.infer<typeof personalInfoSchema>;

type Props = {
  onNext: (data: TPersonalInfo) => void; 
};

const PersonalInformationForm = ({ onNext }: Props) => {
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
      Caste: "",
      Nationality: "Bangladeshi",
      PhoneNumber: "",
      Email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  // onSubmit এর পরিবর্তে onNext কল করব
  const onSubmit: SubmitHandler<TPersonalInfo> = (data) => {
    console.log("✅ Submitted Personal Info:", data);
    onNext(data); // <-- এই লাইনটি handleNext কল করবে SidebarForm থেকে
  };

  return (
    <div className="card p-6 lg:w-3/4 mx-auto shadow-md rounded-xl bg-white">
      <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a] mb-6">
        <b>ব্যক্তিগত তথ্য / Personal Information</b>
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Cinput
            name="Name"
            label="শিক্ষার্থীর নাম / Student's Name*"
            placeholder="Enter student's name in English"
            control={control}
          />

          <Cinput
            name="NAME_BN"
            label="শিক্ষার্থীর নাম (বাংলায়)* / Student's Name in Bengali"
            placeholder="বাংলায় লিখুন"
            control={control}
          />

          <Cinput
            name="Father"
            label="পিতার নাম / Father's Name*"
            placeholder="Enter father's name"
            control={control}
          />

          <Cinput
            name="Mother"
            label="মাতার নাম / Mother's Name*"
            placeholder="Enter mother's name"
            control={control}
          />

          <Cinput
            name="Dob"
            label="জন্ম তারিখ / Date of Birth*"
            type="date"
            control={control}
          />

          <Cselect
            name="Gender"
            label="লিঙ্গ / Gender*"
            placeholder="Select Gender"
            options={genderOptions}
            control={control}
          />

          <Cselect
            name="BloodGroup"
            label="রক্তের গ্রুপ / Blood Group*"
            placeholder="Select Blood Group"
            options={bloodOptions}
            control={control}
          />

          <Cselect
            name="MaritalStatus"
            label="বৈবাহিক অবস্থা / Marital Status*"
            placeholder="Select Marital Status"
            options={maritalOptions}
            control={control}
          />

          <Cinput
            name="Religion"
            label="ধর্ম / Religion*"
            placeholder="Enter religion"
            control={control}
          />

          <Cinput
            name="Caste"
            label="সম্প্রদায় / Caste"
            placeholder="Enter caste"
            control={control}
          />

          <Cinput
            name="Nationality"
            label="জাতীয়তা / Nationality*"
            placeholder="Nationality"
            control={control}
          />

          <Cinput
            name="PhoneNumber"
            label="শিক্ষার্থীর মোবাইল নম্বর / Student's Mobile Number*"
            placeholder="Enter mobile number"
            control={control}
          />

          <Cinput
            name="Email"
            label="শিক্ষার্থীর ইমেইল / Student's Email*"
            placeholder="Enter email address"
            control={control}
          />

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm"
            >
              Save & Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalInformationForm;
