/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AllApplications from "../AllApplications/_components/AllApplication";
import { applicantsData } from "../AllApplications/_components/AllApplicantsdata";

export default function ClearanceCompletePage({searchParams}:any) {
  const searchTerm = searchParams?.searchTerm || "";
  const units = "A";

  const filteredApplications = applicantsData.filter(
    (applicant) => applicant.unit === units
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Applicants</h1>
      <AllApplications applications={filteredApplications} />
    </div>
  );
}
