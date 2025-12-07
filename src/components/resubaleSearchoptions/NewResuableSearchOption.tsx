/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ReusableExcel from "../ResuableExcel/ResubaleExcel";
import { FiSearch } from "react-icons/fi";
import { CHselect } from "../reusable_form/form/CHselect";
import { departmentOptions } from "@/app/(withCommonLayout)/profile/_components/ProfileData";

interface Props {
  applications: any[]; 
  currentUnit: string;
  fileName: string;
  onFilterChange?: (unit: string, department: string, search: string) => void;
}

const NewResuableSearchOption: React.FC<Props> = ({
  applications,
  currentUnit,
  fileName,
  onFilterChange,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const staticUnits = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const initialUnit =
    searchParams.get("unit") || (currentUnit === "all" ? "all" : currentUnit);

  const initialDepartment = searchParams.get("department") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [unit, setUnit] = useState<string>(initialUnit);
  const [department, setDepartment] = useState<string>(initialDepartment);
  const [search, setSearch] = useState<string>(initialSearch);

  const unitOptions = useMemo(() => {
    return [
      { value: "all", label: "All" },
      ...staticUnits.map((u) => ({ value: u, label: u })),
    ];
  }, []);

  const filteredDepartments = useMemo(() => {
    if (unit === "all") return departmentOptions;
    return departmentOptions.filter((dept) => dept.unit === unit);
  }, [unit]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesUnit = unit === "all" || app.unit === unit;
      const matchesDept =
        department === "all" ||
        app.OthersInfo?.Department === department;
      const matchesSearch =
        search === "" ||
        JSON.stringify(app).toLowerCase().includes(search.toLowerCase());
      return matchesUnit && matchesDept && matchesSearch;
    });
  }, [applications, unit, department, search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("unit", unit);
    params.set("department", department);
    params.set("search", search);
    params.set("page", "1");
    router.replace(`${window.location.pathname}?${params.toString()}`);

    if (onFilterChange) onFilterChange(unit, department, search);
  }, [unit, department, search]);

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-end mb-6">
      {currentUnit === "all" && (
        <div className="w-full xl:w-40">
          <CHselect
            name="unit"
            placeholder="Select Unit"
            options={unitOptions}
            value={unit}
            onChange={(value) => {
              setUnit(value);
              setDepartment("all"); 
            }}
          />
        </div>
      )}


      <div className="w-full xl:w-60">
        <CHselect
          name="department"
          placeholder="Select Department"
          options={[{ value: "all", label: "All" }, ...filteredDepartments]}
          value={department}
          onChange={(value) => {
            setDepartment(value);
          }}
        />
      </div>

      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 placeholder:text-gray-400"
        />
      </div>

      <div>
        <ReusableExcel data={filteredApplications} fileName={fileName} />
      </div>
    </div>
  );
};

export default NewResuableSearchOption;
