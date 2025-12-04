/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AllApplications from "../AllApplications/_components/AllApplication";
import { applicantsData } from "../AllApplications/_components/AllApplicantsdata";

export default function PendingApplicationPage({searchParams}:any) {
  const searchTerm = searchParams?.searchTerm || "";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Pending Status</h1>
      <AllApplications applications={applicantsData} />
    </div>
  );
}
