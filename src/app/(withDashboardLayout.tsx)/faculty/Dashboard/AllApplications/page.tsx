import React from "react";
import AllApplications from "./_components/AllApplication";
import { applicantsData } from "./_components/AllApplicantsdata";

interface Props {
  searchParams?: { searchTerm?: string };
}

const AllApplicationPage: React.FC<Props> = ({ searchParams }) => {
  const searchTerm = searchParams?.searchTerm || "";

  console.log(searchTerm)

  return (
    <div>
      <AllApplications applications={applicantsData}/>
    </div>
  );
};

export default AllApplicationPage;
