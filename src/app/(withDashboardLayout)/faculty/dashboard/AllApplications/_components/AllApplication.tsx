"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import ReusableSearchOptions from "@/components/resubaleSearchoptions/ReusableSeachOptions";

interface Applicant {
  gstApplicationId: string;
  subject: string;
  unit: string;
  email: string;
}

interface Props {
  applications: Applicant[];
  units?: string;
}

const AllApplications: React.FC<Props> = ({ applications }) => {
  const [filteredData, setFilteredData] = useState<Applicant[]>(applications);

  const columns: ColumnDef<Applicant>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div className="mt-5">
      <ReusableSearchOptions
        applications={applications}
        units="A"
        onFilterChange={setFilteredData}
        fileName="FilteredApplications.xlsx"
      />

      <NMTable data={filteredData} columns={columns} />
      <TablePagination totalPage={2} />
    </div>
  );
};

export default AllApplications;
