/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import NewResuableSearchOption from "@/components/resubaleSearchoptions/NewResuableSearchOption";
import { showDynamicAlert } from "@/components/resuble_toast/showDeleteAlert";
import { createApproved } from "@/services/ApprovedServices";
import { showToast } from "@/components/resuble_toast/toast";
// import { createApproved } from "@/services/createApproved";
// import { showDynamicAlert } from "@/utils/showDeleteAlert"; 
// import { showToast } from "@/utils/showToast"; // Import your toast function

interface AdminPendingProps {
  applications: any[];
  meta?: any;
}

const AdminPending: React.FC<AdminPendingProps> = ({ applications, meta }) => {

  console.log(applications,"pendings")


  const handleAdminApprove = async (gstApplicationId: string) => {
    const confirmed = await showDynamicAlert({
      confirmTitle: "Approve Application?",
      confirmText: "Do you want to approve this application as Admin?",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
      successTitle: "Approved!",
      successText: "Application has been approved as Admin.",
      icon: "warning",
      itemName: `GST Application ID: ${gstApplicationId}`,
    });

    if (confirmed) {
      try {
        await createApproved({ gstApplicationId, adminApproved: true });
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
    { accessorFn: (row) => row.OthersInfo?.Department || "N/A", header: "Department" },
    { accessorFn: (row) => row.EducationalInfo?.HSCBoard, header: "HSC Board" },
    { accessorFn: (row) => row.EducationalInfo?.HSCRoll, header: "HSC Roll" },
    { accessorFn: (row) => row.EducationalInfo?.HSCYear, header: "HSC Year" },
    {
      header: "Admin Approved",
      accessorFn: (row) => row.Approved?.adminApproved,
      cell: ({ row }) => {
        const approved = row.original?.Approved?.adminApproved;

        return (
          <button
            className={`px-3 py-1 rounded ${
              approved ? "bg-green-500 text-white" : "bg-red-600 text-white"
            }`}
            onClick={() => !approved && handleAdminApprove(row.original.gstApplicationId)}
          >
            {approved ? "Approved" : "Pending"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      <NewResuableSearchOption
        applications={applications}
        currentUnit="A"
        fileName="AdminData.xlsx"
      />

      <NMTable data={applications} columns={columns} />

      <TablePagination totalPage={meta?.total} />
    </div>
  );
};

export default AdminPending;
