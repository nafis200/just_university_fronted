/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useForm, Control } from "react-hook-form";

import TablePagination from "@/components/Resuable_Table/core/NMTable/TablePagination";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { FiSearch } from "react-icons/fi";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import ReusableExcel from "@/components/ResuableExcel/ResubaleExcel";

interface Applicant {
  gstApplicationId: string;
  subject: string;
  unit: string;
  email: string;
}

interface FormValues {
  subject?: string;
}

interface Props {
  applications: Applicant[];
}

const AllApplications: React.FC<Props> = ({ applications }) => {
  const units = "A";
  const { control, watch } = useForm<FormValues>({ defaultValues: { subject: "all" } });
  const selectedSubject = watch("subject");
  const [search, setSearch] = useState<string>("");

  const subjectOptions: any[] = useMemo(() => {
    const filtered = applications.filter((app) => app.unit === units);
    const uniqueSubjects = Array.from(new Set(filtered.map((app) => app.subject)));
    return [
      { value: "all", label: "All" },
      ...uniqueSubjects.map((subj) => ({
        value: subj.toLowerCase().replace(/\s+/g, "_"),
        label: subj,
      })),
    ];
  }, [applications, units]);

  const filteredData: Applicant[] = useMemo(() => {
    return applications.filter((item) => {
      const unitMatch = item.unit === units;
      const searchMatch = item.gstApplicationId.toLowerCase().includes(search.toLowerCase());
      const subjectMatch =
        !selectedSubject || selectedSubject === "all"
          ? true
          : item.subject.toLowerCase().replace(/\s+/g, "_") === selectedSubject;
      return unitMatch && searchMatch && subjectMatch;
    });
  }, [applications, units, search, selectedSubject]);

  const columns: ColumnDef<Applicant>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div className="mt-5">
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between mb-6">
        <div className="w-full xl:w-60">
          <Cselect
            name="subject"
            control={control as unknown as Control<FormValues>}
            placeholder="Select Subject"
            options={subjectOptions}
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

        <div className="xl:shrink-0">
          <ReusableExcel data={filteredData} fileName="FilteredApplications.xlsx" />
        </div>
      </div>

      <NMTable data={filteredData} columns={columns} />
      <TablePagination totalPage={2} />
    </div>
  );
};

export default AllApplications;
