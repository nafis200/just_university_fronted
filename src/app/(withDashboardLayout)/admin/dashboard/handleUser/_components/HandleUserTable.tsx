/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import { showDynamicAlert } from "@/components/resuble_toast/showDeleteAlert";
import { showToast } from "@/components/resuble_toast/toast";
import { updateUserStatus } from "@/services/AdminServices";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  gstApplicationId: string;
  role: string;
  status: "ACTIVE" | "BLOCKED" | string;
  createdAt: string;
}

const HandleUserTable = ({ users }: { users: User[] }) => {
  const handleBlockUnblock = async (user: User) => {
    const action = user.status === "ACTIVE" ? "Block" : "Unblock";

    const confirmed = await showDynamicAlert({
      confirmTitle: `${action} ${user.gstApplicationId}?`,
      confirmText: `Are you sure you want to ${action.toLowerCase()} this user?`,
      confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
      cancelButtonText: "Cancel",
      successTitle: `${action}ed!`,
      successText: `${user.gstApplicationId} has been ${action.toLowerCase()}ed successfully!`,
      icon: action === "Block" ? "warning" : "info",
      itemName: user.gstApplicationId,
    });

    if (!confirmed) return;

    const res = await updateUserStatus(user.gstApplicationId);

    if (res) {
      user.status = action === "Block" ? "BLOCKED" : "ACTIVE";
      showToast(
        `${user.gstApplicationId} has been ${action.toLowerCase()}ed successfully!`,
        "success"
      );
    } else {
      showToast(
        `Failed to ${action.toLowerCase()} user: ${user.gstApplicationId}`,
        "error"
      );
    }
  };

  const columns: ColumnDef<User>[] = [
    { accessorKey: "gstApplicationId", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "createdAt", header: "Created At" },
    {
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <button
            onClick={() => handleBlockUnblock(user)}
            className={`px-3 py-1 rounded-md ${
              user.status === "ACTIVE"
                ? "bg-red-500 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {user.status === "ACTIVE" ? "Block" : "Unblock"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      <NMTable data={users} columns={columns} />
    </div>
  );
};

export default HandleUserTable;
