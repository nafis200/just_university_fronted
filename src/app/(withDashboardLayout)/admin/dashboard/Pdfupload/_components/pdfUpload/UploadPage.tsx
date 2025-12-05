/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import ExcelUploader from "./ExcelUploader";
import { showToast } from "@/components/resuble_toast/toast";
import { uploadExcel } from "@/services/AdminServices";


type FormValues = {
  dataFile: File | null;
};

export default function UploadPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { dataFile: null },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.dataFile) {
      showToast("Please select a file!", "warning");
      return;
    }

    try {
      const result = await uploadExcel(data.dataFile);
      if (result.success) {
        showToast(result.message || "File uploaded successfully!", "success");
        reset();
      } else {
        showToast(result.message || "Upload failed!", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Upload Excel / SQL File
        </h1>

        <ExcelUploader
          name="dataFile"
          control={control}
          label="Upload Your File"
        />

        <Button onClick={handleSubmit(onSubmit)} className="mt-6 w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}
