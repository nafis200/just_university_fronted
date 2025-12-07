/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { useForm, Control } from "react-hook-form";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { UserCheck, UserMinus } from "lucide-react";
import { departmentSeats } from "@/app/(withCommonLayout)/profile/_components/ProfileData";
import { ProgressBar } from "@/app/(withDashboardLayout)/faculty/dashboard/departmentSeats/_components/UnitProgrss/ProgressBar";


interface FormValues {
  subject?: string;
}

interface Props {
  applications: {
    department: string;
    year: number;
    studentCount: number;
  }[];
  selectedUnit: string;
}

const AdminUnitProgress: React.FC<Props> = ({ applications, selectedUnit }) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { subject: "all" },
  });

  const selectedSubject = watch("subject");

  // Prepare subject/department options
  const subjectOptions = useMemo(() => {
    const filteredDepartments =
      selectedUnit.toLowerCase() === "all"
        ? departmentSeats
        : departmentSeats.filter(dep => dep.unit === selectedUnit);

    return [
      { value: "all", label: "All Departments" },
      ...filteredDepartments.map(dep => ({
        value: dep.value.toLowerCase().replace(/\s+/g, "_"),
        label: dep.value,
      })),
    ];
  }, [selectedUnit]);

  // Prepare progress data
  const progressData = useMemo(() => {
    const filteredDepartments =
      selectedUnit.toLowerCase() === "all"
        ? departmentSeats
        : departmentSeats.filter(dep => dep.unit === selectedUnit);

    return filteredDepartments.map(dep => {
      const app = applications.find(a => a.department === dep.value);
      const filled = app ? app.studentCount : 0;
      const seats = dep.seats;
      const empty = Math.max(seats - filled, 0);
      const percentage = Math.min((filled / seats) * 100, 100);

      return {
        department: dep.value,
        filled,
        empty,
        seats,
        percentage,
      };
    });
  }, [applications, selectedUnit]);

  return (
    <div className="flex flex-col gap-4">
      {/* Dropdown to select department */}
      <div className="w-full xl:w-60">
        <Cselect
          name="subject"
          control={control as unknown as Control<FormValues>}
          placeholder="Select Department"
          options={subjectOptions}
        />
      </div>

      {/* Progress bars */}
      <div className="mt-4 space-y-6">
        {progressData
          .filter(({ department }) =>
            selectedSubject === "all" ||
            selectedSubject === department.toLowerCase().replace(/\s+/g, "_")
          )
          .map(({ department, filled, empty, seats, percentage }) => (
            <div key={department} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{department}</span>
                <span>{seats} total</span>
              </div>

              <ProgressBar value={percentage} className="h-4 rounded-lg" />

              <div className="flex gap-4 text-gray-700 text-sm mt-1">
                <div className="flex items-center gap-1">
                  <UserCheck className="w-4 h-4 text-green-500" />
                  <span>{filled} Filled</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserMinus className="w-4 h-4 text-red-500" />
                  <span>{empty} Empty</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminUnitProgress;
