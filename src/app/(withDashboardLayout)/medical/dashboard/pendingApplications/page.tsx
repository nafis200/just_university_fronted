/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";


import FacultyPending from "./_components/FacultyPending";
import { MedicalfetchApplicants } from "@/services/MedicalServices";
export const dynamic = "force-dynamic";
export default async function PendingApplicationPage({ searchParams }: any) {
  const subject = searchParams?.department;
  const unit = searchParams?.unit
  const search = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await MedicalfetchApplicants({
    medicalApproved: false,
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
