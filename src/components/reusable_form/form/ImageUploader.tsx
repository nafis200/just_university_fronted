/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type ImageUploaderProps = {
  name: string;
  control: any;
  label?: string;
};

const ImageField = ({ field, label }: { field: any; label: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (field.value instanceof File) {
      const url = URL.createObjectURL(field.value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof field.value === "string" && field.value) {
      setPreview(field.value);
    }
  }, [field.value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    field.onChange(file);

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 600);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden border"
        )}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Profile Picture"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xs text-gray-500">No Image</span>
        )}
      </div>

      <div className="relative">
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={uploading}
        />

        <Button
          type="button"
          variant="outline"
          className="rounded-full px-4 py-1 text-sm"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            label
          )}
        </Button>

        <p className="text-xs text-gray-500 mt-1 text-center">
          JPG, PNG, GIF — Max 5MB
        </p>
      </div>
    </div>
  );
};

const ImageUploader = ({ name, control, label = "Upload Image" }: ImageUploaderProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <ImageField field={field} label={label} />}
    />
  );
};

export default ImageUploader;
