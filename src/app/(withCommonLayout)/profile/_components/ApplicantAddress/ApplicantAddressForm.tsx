"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { addressSchema } from "../ZodSchema";

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
      Village: "Mohammadpur",
      PostOffice: "Mohammadpur PO",
      PostCode: "1207",
      Thana: "Mohammadpur",
      District: "Dhaka",
      Country: "Bangladesh",
      NID: "19901234567890",
      PresentAddress: "House #123, Road #45, Mohammadpur, Dhaka",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<TAddressInfo> = (data) => {
    console.log("✅ Submitted Address Info:", data);
    onNext(data);
  };

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
            >
              Save & Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApplicantAddressForm;
