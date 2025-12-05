/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { guardianSchema } from "../ZodSchema";
import {
  createGuardianInfo,
  fetchPersonalInfo,
} from "@/services/StudentsServices";
import { showToast } from "@/components/resuble_toast/toast";
import { useUser } from "@/context/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

type TGuardianInfo = z.infer<typeof guardianSchema>;

type Props = {
  onNext: (data: TGuardianInfo) => void;
  onPrev: () => void;
};

const GuardianForm = ({ onNext, onPrev }: Props) => {
  const methods = useForm<TGuardianInfo>({
    resolver: zodResolver(guardianSchema),
    mode: "all",
    defaultValues: {
      // Guardian
      GuardianName: "",
      GuardianOccupation: "",
      GuardianMonthlyIncome: "",
      GuardianRelation: "",
      GuardianVillage: "",
      GuardianPostOffice: "",
      GuardianPostCode: "",
      GuardianThana: "",
      GuardianDistrict: "",
      GuardianCountry: "",
      GuardianNID: "",
      GuardianPhone: "",

      // Legal Guardian
      LegalGuardianName: "",
      LegalGuardianOccupation: "",
      LegalGuardianIncome: "",
      LegalGuardianRelation: "",
      LegalGuardianVillage: "",
      LegalGuardianPostOffice: "",
      LegalGuardianPostCode: "",
      LegalGuardianThana: "",
      LegalGuardianDistrict: "",
      LegalGuardianCountry: "",
      LegalGuardianNID: "",
      LegalGuardianPhone: "",

      // Local Guardian
      LocalGuardianName: "",
      LocalGuardianRelation: "",
      LocalGuardianVillage: "",
      LocalGuardianPostOffice: "",
      LocalGuardianPostCode: "",
      LocalGuardianThana: "",
      LocalGuardianDistrict: "",
      LocalGuardianCountry: "",
      LocalGuardianNID: "",
      LocalGuardianPhone: "",
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
      if (currentValues.GuardianName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchPersonalInfo(user.gstApplicationId);

        if (res && res.data && res.data.length > 0) {
          reset(res.data[0].Guardian);
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

  const onSubmit: SubmitHandler<TGuardianInfo> = async (data) => {
    try {
      const personalInfoPayload = {
        gstApplicationId: user?.gstApplicationId || "",
        ...data,
      };

      onNext(data);

      const res = await createGuardianInfo(personalInfoPayload);

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a]">
            Guardian’s Information / অভিভাবকের তথ্য
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput
              name="GuardianName"
              label="অভিভাবকের নাম / Guardian's name*"
              placeholder="Guardian's name"
              control={control}
            />
            <Cinput
              name="GuardianOccupation"
              label="অভিভাবকের পেশা / Guardian's occupation*"
              placeholder="Guardian's occupation"
              control={control}
            />
            <Cinput
              name="GuardianMonthlyIncome"
              label="অভিভাবকের মাসিক আয় / Guardian's monthly income*"
              placeholder="Monthly income"
              control={control}
            />
            <Cinput
              name="GuardianRelation"
              label="সম্পর্ক / Relation*"
              placeholder="Relation like father/mother/brother"
              control={control}
            />
            <Cinput
              name="GuardianVillage"
              label="গ্রাম / বাড়ি নম্বর / রোড নম্বর / Village / House / Road*"
              placeholder="Village/ House number / Road number"
              control={control}
            />
            <Cinput
              name="GuardianPostOffice"
              label="পোস্ট অফিস / Post office*"
              placeholder="Post office"
              control={control}
            />
            <Cinput
              name="GuardianPostCode"
              label="পোস্ট কোড / Post code*"
              placeholder="Post code"
              control={control}
            />
            <Cinput
              name="GuardianThana"
              label="থানা / Thana*"
              placeholder="Thana"
              control={control}
            />
            <Cinput
              name="GuardianDistrict"
              label="জেলা / District*"
              placeholder="District"
              control={control}
            />
            <Cinput
              name="GuardianCountry"
              label="দেশ / Country*"
              placeholder="Country"
              control={control}
            />
            <Cinput
              name="GuardianNID"
              label="জাতীয় পরিচয়পত্র / NID*"
              placeholder="NID / Birth reg. / Passport number"
              control={control}
            />
            <Cinput
              name="GuardianPhone"
              label="মোবাইল নম্বর / Mobile number*"
              placeholder="Mobile number"
              control={control}
            />
          </div>

          <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a]">
            Legal Guardian Info / পিতার অবর্তমানে আইনানুগ অভিভাবকের তথ্য
          </h2>
          <Cinput
            name="LegalGuardianName"
            label="পিতার অবর্তমানে আইনানুগ অভিভাবকের নাম / Legal Guardian's name*"
            placeholder="Legal Guardian's name"
            control={control}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput
              name="LegalGuardianOccupation"
              label="পেশা / Occupation*"
              placeholder="Occupation"
              control={control}
            />
            <Cinput
              name="LegalGuardianIncome"
              label="মাসিক আয় / Monthly income*"
              placeholder="Monthly income"
              control={control}
            />
            <Cinput
              name="LegalGuardianRelation"
              label="সম্পর্ক / Relation*"
              placeholder="Relation like father/mother/brother"
              control={control}
            />
            <Cinput
              name="LegalGuardianVillage"
              label="গ্রাম / বাড়ি নম্বর / রোড নম্বর / Village / House / Road*"
              placeholder="Village/ House number / Road number"
              control={control}
            />
            <Cinput
              name="LegalGuardianPostOffice"
              label="পোস্ট অফিস / Post office*"
              placeholder="Post office"
              control={control}
            />
            <Cinput
              name="LegalGuardianPostCode"
              label="পোস্ট কোড / Post code*"
              placeholder="Post code"
              control={control}
            />
            <Cinput
              name="LegalGuardianThana"
              label="থানা / Thana*"
              placeholder="Thana"
              control={control}
            />
            <Cinput
              name="LegalGuardianDistrict"
              label="জেলা / District*"
              placeholder="District"
              control={control}
            />
            <Cinput
              name="LegalGuardianCountry"
              label="দেশ / Country*"
              placeholder="Country"
              control={control}
            />
            <Cinput
              name="LegalGuardianNID"
              label="জাতীয় পরিচয়পত্র / NID*"
              placeholder="NID / Birth reg. / Passport number"
              control={control}
            />
            <Cinput
              name="LegalGuardianPhone"
              label="মোবাইল নম্বর / Mobile number*"
              placeholder="Mobile number"
              control={control}
            />
          </div>

          <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a]">
            Local Guardian Info (if any) / স্থানীয় অভিভাবকের তথ্য
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput
              name="LocalGuardianName"
              label="স্থানীয় অভিভাবকের নাম / Local Guardian's name"
              placeholder="Local Guardian's name"
              control={control}
            />
            <Cinput
              name="LocalGuardianRelation"
              label="সম্পর্ক / Relation"
              placeholder="Relation like father/mother/brother"
              control={control}
            />
            <Cinput
              name="LocalGuardianVillage"
              label="গ্রাম / বাড়ি নম্বর / রোড নম্বর / Village / House / Road"
              placeholder="Village/ House number / Road number"
              control={control}
            />
            <Cinput
              name="LocalGuardianPostOffice"
              label="পোস্ট অফিস / Post office"
              placeholder="Post office"
              control={control}
            />
            <Cinput
              name="LocalGuardianPostCode"
              label="পোস্ট কোড / Post code"
              placeholder="Post code"
              control={control}
            />
            <Cinput
              name="LocalGuardianThana"
              label="থানা / Thana"
              placeholder="Thana"
              control={control}
            />
            <Cinput
              name="LocalGuardianDistrict"
              label="জেলা / District"
              placeholder="District"
              control={control}
            />
            <Cinput
              name="LocalGuardianCountry"
              label="দেশ / Country"
              placeholder="Country"
              control={control}
            />
            <Cinput
              name="LocalGuardianNID"
              label="জাতীয় পরিচয়পত্র / NID"
              placeholder="NID / Birth reg. / Passport number"
              control={control}
            />
            <Cinput
              name="LocalGuardianPhone"
              label="মোবাইল নম্বর / Mobile number"
              placeholder="Mobile number"
              control={control}
            />
          </div>

          <div className="flex justify-between pt-6">
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
      </FormProvider>
    </div>
  );
};

export default GuardianForm;
