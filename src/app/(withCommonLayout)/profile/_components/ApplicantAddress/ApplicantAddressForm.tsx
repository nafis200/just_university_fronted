/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { addressSchema } from "../ZodSchema";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { showToast } from "@/components/resuble_toast/toast";
import {
  createAddressInfo,
  fetchPersonalInfo,
} from "@/services/StudentsServices";
import { useUser } from "@/context/UserContext";

type TAddressInfo = z.infer<typeof addressSchema>;

type Props = {
  onNext: (data: TAddressInfo) => void;
  onPrev: () => void;
};

const ApplicantAddressForm = ({ onNext, onPrev }: Props) => {
  const methods = useForm<TAddressInfo>({
    resolver: zodResolver(addressSchema),
    mode: "all",
    defaultValues: {
      Village: "",
      PostOffice: "",
      PostCode: "",
      Thana: "",
      District: "",
      Country: "",
      NID: "",
      PresentAddress: "",
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
      if (currentValues.Country) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetchPersonalInfo(user.gstApplicationId);

        if (res && res.data && res.data.length > 0) {
          reset(res.data[0].Address);
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

  const onSubmit: SubmitHandler<TAddressInfo> = async (data) => {
    try {
      const personalInfoPayload = {
        gstApplicationId: user?.gstApplicationId || "",
        ...data,
      };

      onNext(data);

      const res = await createAddressInfo(personalInfoPayload);

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
        আবেদনকারীর ঠিকানা / Applicant&#39;s Addresses
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Cinput
            name="Village"
            label="গ্রাম / বাড়ি নম্বর / রোড নম্বর / Village / House number / Road number*"
            placeholder="Enter Village / House number / Road number"
            control={control}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput
              name="PostOffice"
              label="পোস্ট অফিস / Post office*"
              placeholder="Enter Post office"
              control={control}
            />

            <Cinput
              name="PostCode"
              label="পোস্ট কোড / Post code*"
              placeholder="Enter Post code"
              control={control}
            />

            <Cinput
              name="Thana"
              label="থানা / Thana*"
              placeholder="Enter Thana"
              control={control}
            />

            <Cinput
              name="District"
              label="জেলা / District*"
              placeholder="Enter District"
              control={control}
            />

            <Cinput
              name="Country"
              label="দেশ / Country*"
              placeholder="Enter Country"
              control={control}
            />
          </div>

          <Cinput
            name="NID"
            label="শিক্ষার্থীর জাতীয় পরিচয়পত্র / জন্ম সনদ / পাসপোর্ট নম্বর / Student's NID / Birth reg. / Passport number*"
            placeholder="Enter NID / Birth reg. / Passport number"
            control={control}
          />

          <Cinput
            name="PresentAddress"
            label="বর্তমান ঠিকানা / Present Address*"
            placeholder="Enter Present Address"
            control={control}
          />

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

export default ApplicantAddressForm;
