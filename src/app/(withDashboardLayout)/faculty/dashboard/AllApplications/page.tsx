/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AllApplications from "./_components/AllApplication";
import { applicantsData } from "./_components/AllApplicantsdata";

export default function AllApplicationPage({searchParams}:any) {
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
