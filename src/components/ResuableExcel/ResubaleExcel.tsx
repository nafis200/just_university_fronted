"use client";

import React from "react";
import * as XLSX from "xlsx";
import { FiFileText } from "react-icons/fi";

type ReusableExcelProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  fileName?: string; 
};

const ReusableExcel = ({ data, fileName = "Applications.xlsx" }: ReusableExcelProps) => {
  const handleExportExcel = () => {
    if (!data || data.length === 0) return;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  return (
    <button
      onClick={handleExportExcel}
      className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 w-full xl:w-auto transition"
    >
      <FiFileText size={18} />
      Export Excel
    </button>
  );
};

export default ReusableExcel;
