/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import FacultyPending from "../pendingApplications/_components/FacultyPending";
import { DeanfetchApplicants } from "@/services/DeanServices";
import { RegisterfetchApplicants } from "@/services/RegisterServices";
export const dynamic = "force-dynamic";
export default async function ClearanceCompletePage({ searchParams }: any) {
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const unit = searchParams?.unit
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await RegisterfetchApplicants({
    registerApproved: true,
    subject,
    search,
    page,
    limit,
    unit
  });

  return (
    <div className="p-4 max-w-6xl">
      <FacultyPending
        applications={applicantsDatas.data}
        meta={applicantsDatas.meta}
      />
    </div>
  );
}
