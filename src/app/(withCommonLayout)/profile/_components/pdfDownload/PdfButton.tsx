"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onPrev: () => void;
};

export const PdfButton = ({ onPrev }: Props) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm">
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
