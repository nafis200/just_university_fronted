"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onPrev: () => void;
  submitData: () => void;
};

export const PdfButton = ({ onPrev, submitData }: Props) => {
  return (
    <div className="min-h-screen flex justify-center gap-4 mt-6">
      <Button
        onClick={submitData}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
      >
        Download PDF
      </Button>
      <Button
        type="button"
        onClick={onPrev}
        className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-sm"
      >
        Prev
      </Button>
    </div>
  );
};
