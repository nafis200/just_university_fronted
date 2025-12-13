/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { fetchApplicants } from "@/services/FacultServices";
import FacultyPending from "./_components/FacultyPending";
export const dynamic = "force-dynamic";
export default async function PendingApplicationPage({ searchParams }: any) {
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await fetchApplicants({
    facultyApproved: false,
    subject,
    search,
    page,
    limit,
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
