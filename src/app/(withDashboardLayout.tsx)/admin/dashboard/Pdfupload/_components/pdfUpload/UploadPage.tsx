"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import ExcelUploader from "./ExcelUploader";

type FormValues = {
  dataFile: File | null;
};

export default function UploadPage() {
  const { control, handleSubmit,reset } = useForm<FormValues>({
    defaultValues: { dataFile: null },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Uploaded File:", data.dataFile);
    reset()
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Upload Excel / SQL File
        </h1>

        <ExcelUploader name="dataFile" control={control} label="Upload Your File" />

        <Button onClick={handleSubmit(onSubmit)} className="mt-6 w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}
