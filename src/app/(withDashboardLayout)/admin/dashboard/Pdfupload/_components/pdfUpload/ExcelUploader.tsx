/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, FileSpreadsheet, Database, X } from "lucide-react";
import { Label } from "@/components/ui/label";

type ExcelUploaderProps = {
  name: string;
  control: any;
  label?: string;
  parentClassName?: string;
};

const MAX_SIZE_MB = 200;

const ExcelUploader = ({
  name,
  control,
  label = "Upload File",
  parentClassName,
}: ExcelUploaderProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileUpload = (
    files: FileList | null,
    onChange: (value: any) => void
  ) => {
    setLocalError(null);
    const file = files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
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

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const removeFile = (onChange: (value: any) => void) => {
    setFileName(null);
    onChange(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-3 w-full", parentClassName)}>
          {label && (
            <Label className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {label}
            </Label>
          )}

          {!fileName && (
            <label
              htmlFor={`file-upload-${name}`}
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 transition-colors gap-2",
                uploading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-gray-400"
              )}
            >
              {uploading ? (
                <Loader2 className="w-8 h-8 text-gray-500 dark:text-gray-400 animate-spin" />
              ) : (
                <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full p-3">
                  <FileSpreadsheet className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </div>
              )}

              <input
                type="file"
                accept=".xlsx,.xls,.sql"
                onChange={(e) => handleFileUpload(e.target.files, field.onChange)}
                className="hidden"
                id={`file-upload-${name}`}
                disabled={uploading}
              />

              <span className="text-gray-600 dark:text-gray-400 text-sm text-center">
                {uploading
                  ? "Uploading..."
                  : `Click to upload Excel or SQL file (Max ${MAX_SIZE_MB} MB)`}
              </span>
            </label>
          )}

          {fileName && (
            <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                {fileName.endsWith(".sql") ? (
                  <Database className="w-6 h-6 text-indigo-600" />
                ) : (
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                )}
                <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {fileName}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => removeFile(field.onChange)}
              >
                <X className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>
          )}

          {(error || localError) && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">
              {localError || error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ExcelUploader;
