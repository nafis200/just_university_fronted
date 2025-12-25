/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, FileSpreadsheet, Database, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/resuble_toast/toast";

type FormValues = {
  dataFile: File | null;
  examDate: string;
};

const MAX_SIZE_MB = 200;

export default function NewUploadPage() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { dataFile: null, examDate: "" },
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files: FileList | null, onChange: (file: any) => void) => {
    setLocalError(null);
    const file = files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/sql",
      "text/sql",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".sql")) {
      setLocalError("Only Excel (.xlsx, .xls) or SQL (.sql) files are allowed");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setLocalError(`File size must be less than ${MAX_SIZE_MB} MB`);
      return;
    }

    setUploading(true);
    setFileName(file.name);
    onChange(file);

    setTimeout(() => setUploading(false), 500);
  };

  const removeFile = (onChange: (file: any) => void) => {
    setFileName(null);
    onChange(null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.dataFile || !data.examDate) {
      showToast("Both file and exam date are required!", "warning");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.dataFile);
      formData.append("applyEndDate", data.examDate);

      const res = await fetch("http://localhost:5000/api/excel/file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "File upload failed");
      }

      const result = await res.json();

      if (result.success) {
        showToast(result.message || "File uploaded successfully!", "success");
        reset();
        setFileName(null);
      } else {
        showToast(result.message || "Upload failed!", "error");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(err.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Upload Excel / SQL File & Apply ending Date
        </h1>
        <Controller
          name="dataFile"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col gap-3 w-full">
              <label
                htmlFor="file-upload"
                className={cn(
                  "flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 transition-colors gap-2",
                  uploading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-gray-400"
                )}
              >
                {uploading ? (
                  <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
                    <FileSpreadsheet className="w-6 h-6 text-green-600" />
                  </div>
                )}

                <input
                  type="file"
                  id="file-upload"
                  accept=".xlsx,.xls,.sql"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files, field.onChange)}
                  disabled={uploading}
                />
                <span className="text-gray-600 text-sm text-center">
                  {uploading
                    ? "Uploading..."
                    : `Click to upload Excel or SQL file (Max ${MAX_SIZE_MB} MB)`}
                </span>
              </label>

              {fileName && (
                <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-3">
                    {fileName.endsWith(".sql") ? (
                      <Database className="w-6 h-6 text-indigo-600" />
                    ) : (
                      <FileSpreadsheet className="w-6 h-6 text-green-600" />
                    )}
                    <span className="font-medium truncate">{fileName}</span>
                  </div>
                  <Button variant="destructive" size="sm" type="button" onClick={() => removeFile(field.onChange)}>
                    <X className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              )}

              {(error || localError) && (
                <p className="text-red-600 text-sm mt-1">{localError || error?.message}</p>
              )}
            </div>
          )}
        />

        {/* Exam Date Input */}
        <Controller
          name="examDate"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-4">
              <Label className="mb-2">Exam Date</Label>
              <input
                type="datetime-local"
                {...field}
                className="border rounded-lg p-2"
              />
            </div>
          )}
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
