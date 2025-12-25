/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import ExcelUploader from "./ExcelUploader";
import { showToast } from "@/components/resuble_toast/toast";

type FormValues = {
  dataFile: File | null;
};

export default function UploadPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { dataFile: null },
  });

  const [loading, setLoading] = useState(false); // loading state

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.dataFile) {
      showToast("Please select a file!", "warning");
      return;
    }

    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("file", data.dataFile);

      const res = await fetch("http://localhost:5000/api/excel/file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "File upload failed");
      }

      const result = await res.json();

      console.log(result);

      if (result.success) {
        showToast(result.message || "File uploaded successfully!", "success");
        reset();
      } else {
        showToast(result.message || "Upload failed!", "error");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(err.message || "Something went wrong!", "error");
    } finally {
      setLoading(false); // stop loading after response
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

        <Button
          onClick={handleSubmit(onSubmit)}
          className="mt-6 w-full"
          disabled={loading} 
        >
          {loading ? "Uploading..." : "Submit"} 
        </Button>
      </div>
    </div>
  );
}
