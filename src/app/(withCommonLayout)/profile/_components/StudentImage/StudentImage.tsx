"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUploader from "@/components/reusable_form/form/ImageUploader";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";

// Single image schema
const imageSchema = z.object({
  avatar_url: z.any(),
});


type ImageFormValues = z.infer<typeof imageSchema>;

type Props = {
  onNext: (data: ImageFormValues) => void;
  onPrev: () => void;
};

const StudentImage = ({ onNext, onPrev }: Props) => {
  const methods = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      avatar_url: undefined,
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<ImageFormValues> = (data) => {
    console.log("Image form submitted:", data);
    onNext(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center p-4">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border
                     border-gray-200 dark:border-gray-800 p-8 w-full"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Profile Picture
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Upload a photo to personalize your profile
            </p>
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Your Photo
              </h3>
            </div>

            <div className="flex justify-center">
              <ImageUploader
                name="avatar_url"
                label="Upload Profile Image"
                control={control}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            <Button
              type="button"
              onClick={onPrev}
              className="px-6 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
            >
              Prev
            </Button>

            <Button
              type="submit"
              className="px-8 py-2.5 rounded-lg font-medium bg-linear-to-r 
                         from-blue-600 to-cyan-600 hover:from-blue-700 
                         hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Save & Next
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StudentImage;
