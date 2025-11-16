/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";




const AllApplications = ({ applications }: { applications:any }) => {
  const columns: ColumnDef<any>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div className="mt-5">
      <NMTable data={applications} columns={columns} />
      <TablePagination totalPage={2} />
    </div>
  );
};

export default AllApplications;
