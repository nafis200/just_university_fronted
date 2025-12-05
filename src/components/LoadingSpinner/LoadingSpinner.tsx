// components/LoadingSpinner.tsx
"use client";

import React from "react";
import { Loader2 } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-center items-start mt-5", 
        className
      )}
    >
      <Loader2 className={`${sizeMap[size]} animate-spin text-primary`} />
    </div>
  );
};

export default LoadingSpinner;
