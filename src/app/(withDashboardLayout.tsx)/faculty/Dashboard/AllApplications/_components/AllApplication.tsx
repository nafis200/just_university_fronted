/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { useForm } from "react-hook-form";
import { Cselect } from "@/components/reusable_form/form/Cselect";

import { FiSearch } from "react-icons/fi";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import ReusableExcel from "@/components/ResuableExcel/ResubaleExcel";

const departmentOptions = [
  { value: "all", label: "All Departments" },
  { value: "A", label: "Unit A" },
  { value: "B", label: "Unit B" },
  { value: "C", label: "Unit C" },
];

const AllApplications = ({ applications }: any) => {

  const units = "A";

  const { control, watch } = useForm({
    defaultValues: { department: "all" },
  });
  const department = watch("department");
  const [search, setSearch] = useState("");

  const filteredData = applications.filter((item: any) => {
    const deptMatch = department === "all" ? true : item.unit === department;
    const searchMatch = item.gstApplicationId
      .toLowerCase()
      .includes(search.toLowerCase());
    return deptMatch && searchMatch;
  });

  const columns: ColumnDef<any>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div className="mt-5">
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between mb-6">
        {/* Department Filter */}
        <div className="w-full xl:w-60">
          <Cselect
            name="department"
            control={control}
            placeholder="Select Department"
            options={departmentOptions}
          />
        </div>

        <div className="relative w-full xl:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search GST Application..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-all duration-200 placeholder:text-gray-400"
          />
        </div>

        {/* Export Button */}
        <div className="xl:shrink-0">
          <ReusableExcel
            data={filteredData}
            fileName="FilteredApplications.xlsx"
          />
        </div>
      </div>

      <NMTable data={filteredData} columns={columns} />
      <TablePagination totalPage={2} />
    </div>
  );
};

export default AllApplications;
