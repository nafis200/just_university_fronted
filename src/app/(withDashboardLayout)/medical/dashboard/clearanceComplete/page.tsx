/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import FacultyPending from "../pendingApplications/_components/FacultyPending";

import { MedicalfetchApplicants } from "@/services/MedicalServices";
export const dynamic = "force-dynamic";
export default async function ClearanceCompletePage({ searchParams }: any) {
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const unit = searchParams?.unit
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await MedicalfetchApplicants({
    medicalApproved: true,
    subject,
    search,
    page,
    limit,
    unit
  });

  return (
    <div>
      <FacultyPending
        applications={applicantsDatas.data}
        meta={applicantsDatas.meta}
      />
    </div>
  );
}
