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
import { CHselect } from "@/components/reusable_form/form/CHselect";
import { SerachDeprtment } from "@/app/(withCommonLayout)/profile/_components/ProfileData";
import { createOthersInfoRole } from "@/services/StudentsServices";
import { X, Trash2 } from "lucide-react";
import { deleteUserByGstApplicationId } from "@/services/AuthServices";

interface FacultyPendingProps {
  applications: any[];
  meta?: any;
}

const FacultyPending: React.FC<FacultyPendingProps> = ({
  applications,
  meta,
}) => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (gstApplicationId: string) => {
    const confirmed = await showDynamicAlert({
      confirmTitle: "Delete User?",
      confirmText:
        "Do you really want to delete this user and all related data?",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      successTitle: "Deleted!",
      successText: `User ${gstApplicationId} deleted successfully`,
      icon: "warning",
      itemName: `GST Application ID: ${gstApplicationId}`,
    });

    if (!confirmed) return;

    const result = await deleteUserByGstApplicationId(gstApplicationId);
    console.log(result);
    if (result) {
      showToast(`User ${gstApplicationId} deleted successfully`, "success");
      router.refresh();
    } else {
      showToast(`Failed to delete user ${gstApplicationId}`, "error");
    }
  };

  const handleAdminApprove = async (gstApplicationId: string) => {
    const confirmed = await showDynamicAlert({
      confirmTitle: "Approve Application?",
      confirmText: "Do you want to approve this application as Faculty?",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
      successTitle: "Approved!",
      successText: "Application has been approved as Admin.",
      icon: "warning",
      itemName: `GST Application ID: ${gstApplicationId}`,
    });

    if (confirmed) {
      try {
        await createApproved({ gstApplicationId, facultyApproved: true });
        router.refresh();
        showToast(
          `Application ${gstApplicationId} approved successfully`,
          "success"
        );
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
      header: "Change Department",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <CHselect
            name="department"
            options={SerachDeprtment}
            placeholder="Select Department"
            value={item?.OthersInfo?.Department || ""}
            onChange={async (value) => {
              try {
                await createOthersInfoRole({
                  gstApplicationId: item.gstApplicationId,
                  Department: value,
                });
                showToast("Department updated", "success");
                router.refresh();
              } catch {
                showToast("Failed to update", "error");
              }
            }}
          />
        );
      },
    },

    {
      header: "Register",
      accessorFn: (row) => row.Approved?.registerApproved,
      cell: ({ row }) => {
        const ok = row.original?.Approved?.registerApproved;
        return ok ? (
          <span className="flex justify-center items-center gap-1 text-green-600">
            Approved
          </span>
        ) : (
          <X className="text-red-600 mx-auto" />
        );
      },
    },

    {
      header: "Medical Status",
      accessorFn: (row) => row.Approved?.medicalApproved,
      cell: ({ row }) => {
        const ok = row.original?.Approved?.medicalApproved;
        return ok ? (
          <span className="flex justify-center items-center gap-1 text-green-600">
            Approved
          </span>
        ) : (
          <X className="text-red-600 mx-auto" />
        );
      },
    },

    {
      header: "Hall Status",
      accessorFn: (row) => row.Approved?.hallRegisterApproved,
      cell: ({ row }) => {
        const ok = row.original?.Approved?.hallRegisterApproved;
        return ok ? (
          <span className="flex justify-center items-center gap-1 text-green-600">
            Approved
          </span>
        ) : (
          <X className="text-red-600 mx-auto" />
        );
      },
    },

    {
      header: "Dean Status",
      accessorFn: (row) => row.Approved?.deanApproved,
      cell: ({ row }) => {
        const ok = row.original?.Approved?.deanApproved;
        return ok ? (
          <span className="flex justify-center items-center gap-1 text-green-600">
            Approved
          </span>
        ) : (
          <X className="text-red-600 mx-auto" />
        );
      },
    },

    {
      header: "Faculty Approved",
      accessorFn: (row) => row.Approved?.facultyApproved,
      cell: ({ row }) => {
        const facultyApproved = row.original?.Approved?.facultyApproved;

        const {
          registerApproved,
          medicalApproved,
          hallRegisterApproved,
          deanApproved,
        } = row.original?.Approved || {};

        const disabled =
          !registerApproved ||
          !medicalApproved ||
          !hallRegisterApproved ||
          !deanApproved;

        return (
          <button
            disabled={disabled}
            className={`px-3 py-1 rounded ${
              facultyApproved
                ? "bg-green-500 text-white"
                : disabled
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-red-600 text-white"
            }`}
            onClick={() =>
              !disabled &&
              !facultyApproved &&
              handleAdminApprove(row.original.gstApplicationId)
            }
          >
            {facultyApproved ? "Approved" : "Pending"}
          </button>
        );
      },
    },
    {
      header: "Delete",
      cell: ({ row }) => {
        const gstApplicationId = row.original.gstApplicationId;
        return (
          <button
            onClick={() => handleDelete(gstApplicationId)}
            className="px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1 hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      <NewResuableSearchOption
        applications={applications}
        currentUnit={user.unit}
        fileName="FacultyData.xlsx"
      />

      <NMTable data={applications} columns={columns} />

      <TablePagination totalPage={meta?.total} />
    </div>
  );
};

export default FacultyPending;
