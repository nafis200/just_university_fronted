import React from "react";
import AllApplications from "../AllApplications/_components/AllApplication";
import { applicantsData } from "../AllApplications/_components/AllApplicantsdata";

interface Props {
  searchParams?: { searchTerm?: string };
}

const ClearanceCompletePage: React.FC<Props> = ({ searchParams }) => {
  const searchTerm = searchParams?.searchTerm || "";

  console.log(searchTerm);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ClearanceComplete</h1>
      <AllApplications applications={applicantsData} />
    </div>
  );
};

export default ClearanceCompletePage;
