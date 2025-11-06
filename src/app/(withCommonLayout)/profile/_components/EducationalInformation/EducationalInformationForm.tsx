"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { subjectOptions } from "../ProfileData";
import { educationalSchema } from "../ZodSchema";
import type z from "zod";

type TEducationalInfo = z.infer<typeof educationalSchema>;

type Props = {
  onNext: (data: TEducationalInfo) => void;
  onPrev: () => void;
};

const EducationalInformationForm = ({ onNext, onPrev }: Props) => {
  const methods = useForm<TEducationalInfo>({
    resolver: zodResolver(educationalSchema),
    mode: "all",
    defaultValues: {
      SSCBoard: "Dhaka",
      SSCInstitution: "ABC High School",
      SSCYear: "2018",
      SSCRoll: "123456",
      SSCGpa: "5.00",
      SSCSubject: "Science",
      HSCBoard: "Dhaka",
      HSCInstitution: "XYZ College",
      HSCYear: "2020",
      HSCRoll: "654321",
      HSCGpa: "4.80",
      HSCSubject: "Science",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<TEducationalInfo> = (data) => {
    console.log("✅ Submitted Educational Info:", data);
    onNext(data); // সাবমিটের পর পরবর্তী ধাপে যাবে
  };

  return (
    <div className="card p-6 lg:w-3/4 mx-auto rounded-xl">
      <h2 className="text-center text-xl sm:text-2xl font-serif text-[#01327a] mb-6">
        <b>শিক্ষাগত তথ্য / Educational Information</b>
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Cinput
            name="SSCBoard"
            label="এস.এস.সি বোর্ড / SSC Board*"
            placeholder="Enter SSC Board"
            control={control}
          />

          <Cinput
            name="SSCInstitution"
            label="এস.এস.সি প্রতিষ্ঠান / SSC Institution*"
            placeholder="Enter SSC Institution"
            control={control}
          />

          <Cinput
            name="SSCYear"
            label="এস.এস.সি পরীক্ষা পাসের সন / SSC Passing Year*"
            placeholder="Enter SSC Passing Year"
            control={control}
          />

          <Cinput
            name="SSCRoll"
            label="এস.এস.সি পরীক্ষার রোল / SSC Roll No.*"
            placeholder="Enter SSC Roll No"
            control={control}
          />

          <Cinput
            name="SSCGpa"
            label="এস.এস.সি জিপিএ / SSC GPA*"
            placeholder="Enter SSC GPA"
            control={control}
          />

          <Cselect
            name="SSCSubject"
            label="এস.এস.সি পঠিত বিষয় / SSC Subject*"
            placeholder="Select SSC Subject"
            options={subjectOptions}
            control={control}
          />

          <Cinput
            name="HSCBoard"
            label="এইচ.এস.সি বোর্ড / HSC Board*"
            placeholder="Enter HSC Board"
            control={control}
          />

          <Cinput
            name="HSCInstitution"
            label="এইচ.এস.সি প্রতিষ্ঠান / HSC Institution*"
            placeholder="Enter HSC Institution"
            control={control}
          />

          <Cinput
            name="HSCYear"
            label="এইচ.এস.সি পরীক্ষা পাসের সন / HSC Passing Year*"
            placeholder="Enter HSC Passing Year"
            control={control}
          />

          <Cinput
            name="HSCRoll"
            label="এইচ.এস.সি পরীক্ষার রোল / HSC Roll No.*"
            placeholder="Enter HSC Roll No"
            control={control}
          />

          <Cinput
            name="HSCGpa"
            label="এইচ.এস.সি জিপিএ / HSC GPA*"
            placeholder="Enter HSC GPA"
            control={control}
          />

          <Cselect
            name="HSCSubject"
            label="এইচ.এস.সি পঠিত বিষয় / HSC Subject*"
            placeholder="Select HSC Subject"
            options={subjectOptions}
            control={control}
          />

          {/* Prev & Next বাটন */}
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

export default EducationalInformationForm;
