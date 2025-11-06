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
    } else if (typeof field.value === "string" && field.value) {
      setPreview(field.value);
    } else {
      setPreview(null);
    }
  }, [field.value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // try {
    //   const updatedProfile = await profileAPI.uploadAvatar(file);
    //   queryClient.invalidateQueries({ queryKey: ["security"] });
    //   field.onChange(updatedProfile.avatar_url);
    //   await refreshProfile();
    //   showToast("Avatar uploaded successfully!", "success");
    // } catch (error: any) {
    //   showToast(
    //     `Failed to upload avatar: ${
    //       error instanceof Error ? error.message : "Unknown error"
    //     }`,
    //     "error"
    //   );
    // } finally {
    //   setUploading(false);
    // }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-16 h-16 sm:w-20 sm:h-20 flex items-start justify-start text-white text-2xl font-bold overflow-hidden bg-gray-200"
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
        ) : null}
      </div>

      <div>
        <span className="relative top-1">
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
            JPG, PNG, or GIF. Max 5MB.
          </p>
        </span>
      </div>
    </div>
  );
};

const ImageUploader = ({
  name,
  control,
  label = "Change avatar",
}: ImageUploaderProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <ImageField field={field} label={label} />}
    />
  );
};

export default ImageUploader;
