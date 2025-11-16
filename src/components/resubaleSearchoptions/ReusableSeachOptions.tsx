/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, Control } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import ReusableExcel from "../ResuableExcel/ResubaleExcel";
import { useRouter, useSearchParams } from "next/navigation";

interface FormValues {
  subject?: string;
  unit?: string;
}

interface Props {
  applications: any[];
  units: string;
  fileName: string;
  onFilterChange?: (filteredData: any[]) => void;
}

const ReusableSearchOptions: React.FC<Props> = ({
  applications,
  units,
  onFilterChange,
  fileName,
}) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { subject: "all", unit: "all" },
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>("");

  const selectedUnit = watch("unit");
  const selectedSubject = watch("subject");

  const currentUnits = units.toLowerCase();

  const unitOptions = useMemo(() => {
    if (currentUnits === "all") {
      return [
        { value: "all", label: "All" },
        ...Array.from(new Set(applications.map((app) => app.unit))).map(
          (u) => ({
            value: u,
            label: u,
          })
        ),
      ];
    }
    return [];
  }, [applications, currentUnits]);

  const subjectOptions = useMemo(() => {
    if (currentUnits === "all") return [];
    const filtered = applications.filter(
      (app) => app.unit.toLowerCase() === currentUnits
    );
    const uniqueSubjects = Array.from(
      new Set(filtered.map((app) => app.subject))
    );
    return [
      { value: "all", label: "All" },
      ...uniqueSubjects.map((subj) => ({
        value: subj.toLowerCase().replace(/\s+/g, "_"),
        label: subj,
      })),
    ];
  }, [applications, currentUnits]);

  const filteredData = useMemo(() => {
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

  useEffect(() => {
    if (onFilterChange) onFilterChange(filteredData);
  }, [filteredData, onFilterChange]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("searchTerm", search);
    } else {
      params.delete("searchTerm");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [search]);

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-end mb-6">
      {currentUnits === "all" && (
        <div className="w-full xl:w-40">
          <Cselect
            name="unit"
            control={control as unknown as Control<FormValues>}
            placeholder="Select Unit"
            options={unitOptions}
          />
        </div>
      )}

      {currentUnits !== "all" && (
        <div className="w-full xl:w-60">
          <Cselect
            name="subject"
            control={control as unknown as Control<FormValues>}
            placeholder="Select Subject"
            options={subjectOptions}
          />
        </div>
      )}

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

export default ReusableSearchOptions;
