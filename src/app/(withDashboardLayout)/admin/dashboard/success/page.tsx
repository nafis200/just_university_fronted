/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchDepartmentStatus } from "@/services/ApprovedServices";
import React from "react";
import AdminPending from "../pending/components/AdminPending";
export const dynamic = "force-dynamic";

const AdminPendings = async ({ searchParams }: any) => {
  const unit = searchParams?.unit;
  const department = searchParams?.department;
  const searchTerm = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await fetchDepartmentStatus({
    adminApproved: true,
    unit,
    department,
    searchTerm,
    page,
    limit,
  });

  return (
    <div>
      <AdminPending
        applications={applicantsDatas.data}
        meta={applicantsDatas.meta}
      />
    </div>
  );
};

export default AdminPendings;
