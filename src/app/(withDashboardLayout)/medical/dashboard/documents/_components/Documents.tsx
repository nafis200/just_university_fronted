/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import NewResuableSearchOption from "@/components/resubaleSearchoptions/NewResuableSearchOption";
import { showToast } from "@/components/resuble_toast/toast";
import { useUser } from "@/context/UserContext";

import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createDocuments } from "@/services/DocumentServices";

interface DocumentsProps {
  applications: any[];
  meta?: any;
}

const Documents: React.FC<DocumentsProps> = ({ applications, meta }) => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) return <div>Loading...</div>;

  const handleDocumentUpdate = async (gstApplicationId: string, field: string) => {
    try {
      const data: FieldValues = { gstApplicationId, [field]: true };
      await createDocuments(data);
      router.refresh();
      showToast(`Document ${field} for ${gstApplicationId} marked as received`, "success");
    } catch (error) {
      showToast(`Failed to update document ${field} for ${gstApplicationId}`, "error");
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "unit", header: "Unit" },
    { accessorFn: (row) => row.personalInfo?.Name, header: "Name" },
    { accessorFn: (row) => row.OthersInfo?.Department || "N/A", header: "Department" },
    {
      header: "SSC Marksheet",
      accessorFn: (row) => row.Document?.sscMarksheet,
      cell: ({ row }) => {
        const received = row.original?.Document?.sscMarksheet;
        return (
          <button
            className={`px-3 py-1 rounded ${received ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}
            onClick={() => !received && handleDocumentUpdate(row.original.gstApplicationId, "sscMarksheet")}
          >
            {received ? "Received" : "Pending"}
          </button>
        );
      },
    },
    {
      header: "SSC Transcript",
      accessorFn: (row) => row.Document?.sscTranscript,
      cell: ({ row }) => {
        const received = row.original?.Document?.sscTranscript;
        return (
          <button
            className={`px-3 py-1 rounded ${received ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}
            onClick={() => !received && handleDocumentUpdate(row.original.gstApplicationId, "sscTranscript")}
          >
            {received ? "Received" : "Pending"}
          </button>
        );
      },
    },
    {
      header: "HSC Marksheet",
      accessorFn: (row) => row.Document?.hscMarksheet,
      cell: ({ row }) => {
        const received = row.original?.Document?.hscMarksheet;
        return (
          <button
            className={`px-3 py-1 rounded ${received ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}
            onClick={() => !received && handleDocumentUpdate(row.original.gstApplicationId, "hscMarksheet")}
          >
            {received ? "Received" : "Pending"}
          </button>
        );
      },
    },
    {
      header: "HSC Transcript",
      accessorFn: (row) => row.Document?.hscTranscript,
      cell: ({ row }) => {
        const received = row.original?.Document?.hscTranscript;
        return (
          <button
            className={`px-3 py-1 rounded ${received ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}
            onClick={() => !received && handleDocumentUpdate(row.original.gstApplicationId, "hscTranscript")}
          >
            {received ? "Received" : "Pending"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      <NewResuableSearchOption
        applications={applications}
        currentUnit="all"
        fileName="DocumentsData.xlsx"
      />
      <NMTable data={applications} columns={columns} />
      <TablePagination totalPage={meta?.total} />
    </div>
  );
};

export default Documents;
