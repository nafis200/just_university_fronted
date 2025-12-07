/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import FacultyPending from "../pendingApplications/_components/FacultyPending";
import { fetchApplicants } from "@/services/FacultServices";

export default async function ClearanceCompletePage({ searchParams }: any) {
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;

  const applicantsDatas = await fetchApplicants({
    facultyApproved: true,
    subject,
    search,
    page,
    limit,
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
