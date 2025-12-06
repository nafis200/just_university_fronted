/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ReusableExcel from "../ResuableExcel/ResubaleExcel";
import { FiSearch } from "react-icons/fi";
import { CHselect } from "../reusable_form/form/CHselect";

interface Props {
  applications: any[];
  currentUnit: string;
  fileName: string;
  onFilterChange?: (value: string) => void;
}

const NewResuableSearchOption: React.FC<Props> = ({
  applications,
  currentUnit,
  fileName,
  onFilterChange,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const staticUnits = ["A", "B", "C"];

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

  const departmentOptions = useMemo(() => {
    const filteredApps = applications.filter(
      (app) => unit === "all" || app.unit === unit
    );

    const uniqueDeps = Array.from(
      new Set(
        filteredApps
          .map((app) => app.OthersInfo?.Department)
          .filter(Boolean)
      )
    );

    return [
      { value: "all", label: "All" },
      ...uniqueDeps.map((d) => ({ value: d, label: d })),
    ];
  }, [applications, unit]);

 
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("unit", unit);
    params.set("department", department);
    params.set("search", search);

    params.set("page", "1"); 

    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [unit, department, search]);

  const filteredData = applications.filter((app) => {
    const matchesUnit = unit === "all" || app.unit === unit;
    const matchesDept =
      department === "all" || app.OthersInfo?.Department === department;

    const matchesSearch =
      search === "" ||
      JSON.stringify(app).toLowerCase().includes(search.toLowerCase());

    return matchesUnit && matchesDept && matchesSearch;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-end mb-6">
      <div className="w-full  xl:w-40">
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

      <div className="w-full xl:w-60">
        <CHselect
          name="department"
          placeholder="Select Department"
          options={departmentOptions}
          value={department}
          onChange={setDepartment}
        />
      </div>

  
      <div className="relative flex-1">
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

      <div>
        <ReusableExcel data={filteredData} fileName={fileName} />
      </div>
    </div>
  );
};

export default NewResuableSearchOption;
