/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type CselectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  value?: string; // controlled value
  onChange?: (value: string) => void; // controlled change
};

export const Cselect: React.FC<CselectProps> = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <Label
          htmlFor={name}
          className="mb-2 ml-2 text-sm sm:text-base font-medium text-gray-700 dark:text-white"
        >
          {label}:
        </Label>
      )}

      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full h-20 p-[22px] sm:h-12 md:h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl text-sm sm:text-base">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
