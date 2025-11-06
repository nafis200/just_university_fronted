/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type ImageUploaderProps = {
  name: string;
  control: any;
  label?: string;
  parentClassName?: string;
};

const MAX_SIZE_MB = 5;

const ImageUploader = ({
  name,
  control,
  label = "Upload Image",
  parentClassName,
}: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileUpload = (files: FileList | null, onChange: (value: any) => void) => {
    setLocalError(null);
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Only image files are allowed");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setLocalError(`File size must be less than ${MAX_SIZE_MB} MB`);
      return;
    }

    setUploading(true);

    // preview generate
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(file);

    // simulation of upload delay
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const removeFile = (onChange: (value: any) => void) => {
    setPreviewUrl(null);
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

          {!previewUrl && (
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
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                  🖼️
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={(e) => handleFileUpload(e.target.files, field.onChange)}
                className="hidden"
                id={`file-upload-${name}`}
                disabled={uploading}
              />
              <span className="text-gray-600 dark:text-gray-400 text-sm text-center">
                {uploading
                  ? "Uploading..."
                  : `Click to upload Image (Max ${MAX_SIZE_MB} MB)`}
              </span>
            </label>
          )}

          {previewUrl && (
            <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={40}
                  height={40}
                  className="object-cover rounded"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {previewUrl.split("/").pop()}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => removeFile(field.onChange)}
              >
                Remove
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

export default ImageUploader;
