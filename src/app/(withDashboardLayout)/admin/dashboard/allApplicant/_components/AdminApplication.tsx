/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import NewResuableSearchOption from "@/components/resubaleSearchoptions/NewResuableSearchOption";

interface AdminApplicationProps {
  applications: any[];
  meta?: any;
}

const StatusBadge = ({ status }: { status: boolean | null | undefined }) => {
  const finalStatus = status ? "Accepted" : "Pending";
  const color = status ? "bg-green-500" : "bg-yellow-500";

  return (
    <span className={`px-2 py-1 rounded-full ${status ? "text-green-500" : "text-red-500"} `}>
      {finalStatus}
    </span>
  );
};

const AdminApplication: React.FC<AdminApplicationProps> = ({ applications, meta }) => {
  const columns: ColumnDef<any>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "unit", header: "Unit" },
    { accessorFn: (row) => row.personalInfo?.Name, header: "Name" },
    { accessorFn: (row) => row.OthersInfo?.Department || "N/A", header: "Department" },
    { accessorFn: (row) => row.EducationalInfo?.HSCBoard, header: "HSC Board" },
    { accessorFn: (row) => row.EducationalInfo?.HSCRoll, header: "HSC Roll" },
    { accessorFn: (row) => row.EducationalInfo?.HSCYear, header: "HSC Year" },

       { accessorFn: (row) => row.OmrResult?.OmrPhysics || "N/A", header: "OMR Physics" },
    { accessorFn: (row) => row.OmrResult?.OmrChemistry ?? "N/A", header: "OMR Chemistry" },
    { accessorFn: (row) => row.OmrResult?.OmrMath ?? "N/A", header: "OMR Math" },
    { accessorFn: (row) => row.OmrResult?.OmrBiology ?? "N/A", header: "OMR Biology" },
    { accessorFn: (row) => row.OmrResult?.OmrBangla || "N/A", header: "OMR Bangla" },
    { accessorFn: (row) => row.OmrResult?.OmrEnglish ?? "N/A", header: "OMR English" },
    { accessorFn: (row) => row.OmrResult?.OmrTotal, header: "OMR Total" },
    { accessorFn: (row) => row.OmrResult?.OmrStatus, header: "OMR Status" },
    { accessorFn: (row) => row.OmrResult?.Position, header: "Position" },

    {
      header: "Admin Approved",
      accessorFn: (row) => row.Approved?.adminApproved,
      cell: ({ row }) => (
        <StatusBadge status={row.original?.Approved?.adminApproved} />
      ),
    },
    {
      header: "Faculty Approved",
      accessorFn: (row) => row.Approved?.facultyApproved,
      cell: ({ row }) => (
        <StatusBadge status={row.original?.Approved?.facultyApproved} />
      ),
    },
    {
      header: "Dean Approved",
      accessorFn: (row) => row.Approved?.deanApproved,
      cell: ({ row }) => (
        <StatusBadge status={row.original?.Approved?.deanApproved} />
      ),
    },
    {
      header: "Register Approved",
      accessorFn: (row) => row.Approved?.registerApproved,
      cell: ({ row }) => (
        <StatusBadge status={row.original?.Approved?.registerApproved} />
      ),
    },
    {
      header: "Hall Register Approved",
      accessorFn: (row) => row.Approved?.hallRegisterApproved,
      cell: ({ row }) => (
        <StatusBadge status={row.original?.Approved?.hallRegisterApproved} />
      ),
    },


 
  ];

  return (
    <div className="mt-5">
      <NewResuableSearchOption
        applications={applications}
        currentUnit="all"
        fileName="FilteredApplications.xlsx"
      />

      <NMTable data={applications} columns={columns} />

      <TablePagination totalPage={meta?.total} />
    </div>
  );
};

export default AdminApplication;
