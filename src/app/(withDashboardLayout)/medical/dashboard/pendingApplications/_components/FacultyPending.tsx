/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";


import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import NewResuableSearchOption from "@/components/resubaleSearchoptions/NewResuableSearchOption";
import { showDynamicAlert } from "@/components/resuble_toast/showDeleteAlert";
import { createApproved } from "@/services/ApprovedServices";
import { showToast } from "@/components/resuble_toast/toast";
import { useUser } from "@/context/UserContext";
import { X } from "lucide-react";

interface FacultyPendingProps {
  applications: any[];
  meta?: any;
}

const FacultyPending: React.FC<FacultyPendingProps> = ({ applications, meta }) => {

  const {user} = useUser()
  const router = useRouter();
  if (!user) {
  return <div>Loading...</div>;
 }

  const handleAdminApprove = async (gstApplicationId: string) => {

    
    const confirmed = await showDynamicAlert({
      confirmTitle: "Approve Application?",
      confirmText: "Do you want to approve this application as Register?",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
      successTitle: "Approved!",
      successText: "Application has been approved as Medical Officer.",
      icon: "warning",
      itemName: `GST Application ID: ${gstApplicationId}`,
    });

    if (confirmed) {
      try {
        await createApproved({ gstApplicationId, medicalApproved: true });
        router.refresh();
        showToast(`Application ${gstApplicationId} approved successfully`, "success");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        showToast(`Failed to approve application ${gstApplicationId}`, "error");
      }
    }
  };



const columns: ColumnDef<any>[] = [
  { accessorKey: "gstApplicationId", header: "GST Application ID" },
  { accessorKey: "unit", header: "Unit" },
  { accessorFn: (row) => row.personalInfo?.Name, header: "Name" },
  {
    accessorFn: (row) => row.OthersInfo?.Department || "N/A",
    header: "Department",
  },
  { accessorFn: (row) => row.EducationalInfo?.HSCBoard, header: "HSC Board" },
  { accessorFn: (row) => row.EducationalInfo?.HSCRoll, header: "HSC Roll" },
  { accessorFn: (row) => row.EducationalInfo?.HSCYear, header: "HSC Year" },

  {
    header: "Register Approved",
    accessorFn: (row) => row.Approved?.registerApproved,
    cell: ({ row }) => {
      const registerApproved = row.original?.Approved?.registerApproved;

      return registerApproved ? (
        <span className="text-green-600 font-semibold">Approved</span>
      ) : (
        <X className="text-red-600 mx-auto" />
      );
    },
  },

  {
    header: "Medical Officer Approved",
    accessorFn: (row) => row.Approved?.medicalApproved,
    cell: ({ row }) => {
      const medicalApproved = row.original?.Approved?.medicalApproved;
      const registerApproved = row.original?.Approved?.registerApproved;

      const disabled = !registerApproved;

      return (
        <button
          disabled={disabled}
          className={`px-3 py-1 rounded ${
            medicalApproved
              ? "bg-green-500 text-white"
              : disabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-red-600 text-white"
          }`}
          onClick={() =>
            !disabled && handleAdminApprove(row.original.gstApplicationId)
          }
        >
          {medicalApproved ? "Approved" : "Pending"}
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
        fileName="MedicalData.xlsx"
      />

      <NMTable data={applications} columns={columns} />

      <TablePagination totalPage={meta?.total} />
    </div>
  );
};

export default FacultyPending;
