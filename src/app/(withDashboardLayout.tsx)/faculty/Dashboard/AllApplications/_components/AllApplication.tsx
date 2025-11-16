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
  unit?: string;
}

interface Props {
  applications: Applicant[];
  units?: string;
}

const AllApplications: React.FC<Props> = ({ applications }) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { subject: "all", unit: "all" },
  });

  const [search, setSearch] = useState<string>("");

  const currentUnits = "all";

  const selectedUnit = watch("unit");
  const selectedSubject = watch("subject");

  const unitOptions = useMemo(() => {
    return [
      { value: "all", label: "All" },
      ...Array.from(new Set(applications.map((app) => app.unit))).map((u) => ({
        value: u,
        label: u,
      })),
    ];
  }, [applications]);

  const subjectOptions = useMemo(() => {
    if (currentUnits === "all") return [];
    const filtered = applications.filter(
      (app) => app.unit.toLowerCase() === currentUnits
    );
    const uniqueSubjects = Array.from(new Set(filtered.map((app) => app.subject)));
    return [
      { value: "all", label: "All" },
      ...uniqueSubjects.map((subj) => ({
        value: subj.toLowerCase().replace(/\s+/g, "_"),
        label: subj,
      })),
    ];
  }, [applications, currentUnits]);

  const filteredData: Applicant[] = useMemo(() => {
    return applications.filter((item) => {
      const unitMatch =
        currentUnits === "all"
          ? selectedUnit === "all" || !selectedUnit
            ? true
            : item.unit === selectedUnit
          : item.unit.toLowerCase() === currentUnits;

      const subjectMatch =
        currentUnits === "all"
          ? true
          : selectedSubject === "all" || !selectedSubject
          ? true
          : item.subject.toLowerCase().replace(/\s+/g, "_") === selectedSubject;

      const searchMatch = item.gstApplicationId
        .toLowerCase()
        .includes(search.toLowerCase());

      return unitMatch && subjectMatch && searchMatch;
    });
  }, [applications, currentUnits, selectedUnit, selectedSubject, search]);

  const columns: ColumnDef<Applicant>[] = [
    { accessorKey: "gstApplicationId", header: "GST Application ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "email", header: "Email" },
  ];

  return (
    <div className="mt-5">
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between mb-6">
        {currentUnits === "all" ? (
          <div className="w-full xl:w-40">
            <Cselect
              name="unit"
              control={control as unknown as Control<FormValues>}
              placeholder="Select Unit"
              options={unitOptions}
            />
          </div>
        ) : (
          <div className="w-full xl:w-60">
            <Cselect
              name="subject"
              control={control as unknown as Control<FormValues>}
              placeholder="Select Subject"
              options={subjectOptions}
            />
          </div>
        )}

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
