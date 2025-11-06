"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { guardianSchema } from "../ZodSchema";

type TGuardianInfo = z.infer<typeof guardianSchema>;

type Props = {
  onNext: (data: TGuardianInfo) => void; // Next step
  onPrev: () => void; // Prev step
};

const GuardianForm = ({ onNext, onPrev }: Props) => {
  const methods = useForm<TGuardianInfo>({
    resolver: zodResolver(guardianSchema),
    mode: "all",
    defaultValues: {
      // Guardian
      GuardianName: "Md. Rahim",
      GuardianOccupation: "Businessman",
      GuardianMonthlyIncome: "50000",
      GuardianRelation: "Father",
      GuardianVillage: "Mohammadpur",
      GuardianPostOffice: "Mohammadpur PO",
      GuardianPostCode: "1207",
      GuardianThana: "Mohammadpur",
      GuardianDistrict: "Dhaka",
      GuardianCountry: "Bangladesh",
      GuardianNID: "19901234567890",
      GuardianPhone: "017XXXXXXXX",

      // Legal Guardian
      LegalGuardianName: "Mrs. Fatema",
      LegalGuardianOccupation: "Housewife",
      LegalGuardianIncome: "0",
      LegalGuardianRelation: "Mother",
      LegalGuardianVillage: "Mohammadpur",
      LegalGuardianPostOffice: "Mohammadpur PO",
      LegalGuardianPostCode: "1207",
      LegalGuardianThana: "Mohammadpur",
      LegalGuardianDistrict: "Dhaka",
      LegalGuardianCountry: "Bangladesh",
      LegalGuardianNID: "19909876543210",
      LegalGuardianPhone: "018XXXXXXXX",

      // Local Guardian
      LocalGuardianName: "Mr. Karim",
      LocalGuardianRelation: "Uncle",
      LocalGuardianVillage: "Dhanmondi",
      LocalGuardianPostOffice: "Dhanmondi PO",
      LocalGuardianPostCode: "1209",
      LocalGuardianThana: "Dhanmondi",
      LocalGuardianDistrict: "Dhaka",
      LocalGuardianCountry: "Bangladesh",
      LocalGuardianNID: "19901122334455",
      LocalGuardianPhone: "019XXXXXXXX",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<TGuardianInfo> = (data) => {
    console.log("✅ Submitted Guardian Info:", data);
    onNext(data); // সাবমিটের পর পরবর্তী ধাপে যাবে
  };

  return (
    <div className="card p-6 lg:w-3/4 mx-auto shadow-md rounded-xl bg-white space-y-6">
      <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a]">
        <b>Guardian&rsquo;s Information / অভিভাবকের তথ্য</b>
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Guardian Info */}
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

          {/* Legal Guardian Info */}
          <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a] mt-10">
            <b>Legal Guardian Info / পিতার অবর্তমানে আইনানুগ অভিভাবকের তথ্য</b>
          </h2>
          <Cinput
            name="LegalGuardianName"
            label="পিতার অবর্তমানে আইনানুগ অভিভাবকের নাম / Legal Guardian's name*"
            placeholder="Legal Guardian's name"
            control={control}
          />
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

          {/* Local Guardian Info */}
          <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a] mt-10">
            <b>Local Guardian Info (if any) / স্থানীয় অভিভাবকের তথ্য</b>
          </h2>
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

          {/* Prev & Next Buttons */}
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
              Finish
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default GuardianForm;
