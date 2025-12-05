/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { Ctextarea } from "@/components/reusable_form/form/Ctextarea";
import { othersInfoSchema } from "../ZodSchema";
import { departmentOptions, hallOptions, programOptions } from "../ProfileData";
import { useUser } from "@/context/UserContext";
import {
  createOthersInfo,
  fetchPersonalInfo,
} from "@/services/StudentsServices";
import { showToast } from "@/components/resuble_toast/toast";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

type OthersInfoFormValues = z.infer<typeof othersInfoSchema>;

type Props = {
  onNext: (data: OthersInfoFormValues) => void;
  onPrev: () => void;
};

export const OthersInfoForm = ({ onNext, onPrev }: Props) => {
  const methods = useForm<OthersInfoFormValues>({
    resolver: zodResolver(othersInfoSchema),
    defaultValues: {
      Department: "",
      Program: "",
      HallName: "",
      StudyBreakCause: "N/A",
      AlreadyAdmittedInstitution: "N/A",
      ApplicantEmployment: "N/A",
      Scholarships: "N/A",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersonalInfo = async () => {
      if (!user?.gstApplicationId) return;

      const currentValues = getValues();
      if (currentValues.Department) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchPersonalInfo(user.gstApplicationId);

        if (res && res.data && res.data.length > 0) {
          reset(res.data[0].OthersInfo);
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

  const onSubmit: SubmitHandler<OthersInfoFormValues> = async (data) => {
    try {
      
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value === "" ? undefined : value])
      );

      const personalInfoPayload = {
        gstApplicationId: user?.gstApplicationId || "",
        ...cleanedData,
      };

      onNext(cleanedData as OthersInfoFormValues);

      const res = await createOthersInfo(personalInfoPayload);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <FormProvider {...methods}>
        <div className="w-full max-w-3xl">
          <div className="card text-[#01327a] font-serif mb-4 text-center p-2">
            <h5>
              <b>Others Information</b>
            </h5>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card bg-white shadow-md p-6 rounded-lg space-y-4"
          >
            <Cselect
              name="Department"
              label="ভর্তিচ্ছু বিভাগ / (Admitting department)"
              options={departmentOptions}
              control={control}
            />
            <Cselect
              name="Program"
              label="ভর্তিচ্ছু প্রোগ্রাম / (Admitting program)"
              options={programOptions}
              control={control}
            />
            <Cselect
              name="HallName"
              label="সংযুক্ত হলের নাম / (Hall attached)"
              options={hallOptions}
              control={control}
            />

            <Ctextarea
              name="StudyBreakCause"
              label="ছাত্রাবস্থায় কখনো পড়াশোনা বন্ধ থাকলে তার কারণ / (Mention causes for break of study, if any)"
              control={control}
              rows={4}
              placeholder="Mention causes for break of study, if any (150 words max)"
            />

            <Ctextarea
              name="AlreadyAdmittedInstitution" 
              label="অন্য কোনো অনুষদ, বিভাগ বা শিক্ষা প্রতিষ্ঠানে ভর্তি হয়ে থাকলে তার নাম / (Name of faculty / department / institution already admitted)"
              control={control}
              rows={4}
              placeholder="Name of the faculty / Department / institution already admitted (150 words max)"
            />

            <Ctextarea
              name="ApplicantEmployment"
              label="আবেদনকারী সরকারি বা অন্যত্র চাকুরীতে নিযুক্ত রয়েছেন কিনা / (Applicants in employment shall submit NOC issued by employer)"
              control={control}
              rows={4}
              placeholder="Applicants in employment shall submit NOC issued by the employer (150 words max)"
            />

            <Ctextarea
              name="Scholarships"
              label="স্বীকৃত প্রতিষ্ঠান থেকে প্রাপ্ত বৃত্তি, পদক অথবা পুরষ্কার / (Scholarships, medals, or prizes obtained)"
              control={control}
              rows={4}
              placeholder="Scholarships, medals, or prizes obtained from any recognized organization (150 words max)"
            />

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={onPrev}
                className="px-6 py-2 rounded-xl bg-gray-400 hover:bg-gray-500 text-white shadow-sm"
              >
                Prev
              </Button>

              <Button
                type="submit"
                className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Save & Next"}
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};
