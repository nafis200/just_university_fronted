import React from "react";
import UnitProgress from "./_components/UnitProgrss/UnitProgress";
import { applicantsData } from "../AllApplications/_components/AllApplicantsdata";

const DepartmentSeatStatus = () => {
  return (
    <div className="mt-5">
      <UnitProgress
        applications={applicantsData}
        selectedUnit={"B"}
      />
    </div>
  );
};

export default DepartmentSeatStatus;
