/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { useForm, Control } from "react-hook-form";
import { Cselect } from "@/components/reusable_form/form/Cselect";
import { Progress } from "@/components/ui/progress";
import { UserCheck, UserMinus } from "lucide-react";
import { totalSeat } from "../../../AllApplications/_components/TotalSeat";

interface FormValues {
  subject?: string;
}

interface Props {
  applications: any[]; 
  selectedUnit: string;
  
}

const UnitProgress: React.FC<Props> = ({
  applications,
  selectedUnit,

}) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: { subject: "all" },
  });

  const selectedSubject = watch("subject");

  const subjectOptions = useMemo(() => {
    if (!selectedUnit || selectedUnit === "all") return [];
    const filtered = applications.filter(app => app.unit === selectedUnit);
    const uniqueSubjects = Array.from(new Set(filtered.map(app => app.subject)));
    return [
      { value: "all", label: "All Subjects" },
      ...uniqueSubjects.map(subj => ({
        value: subj.toLowerCase().replace(/\s+/g, "_"),
        label: subj,
      })),
    ];
  }, [applications, selectedUnit]);

  const progressData = useMemo(() => {
    if (!selectedUnit || selectedUnit === "all") return [];
    const subjects = Array.from(
      new Set(applications.filter(app => app.unit === selectedUnit).map(app => app.subject))
    );

    return subjects.map(subject => {
      const filled = applications.filter(
        app => app.unit === selectedUnit && app.subject === subject
      ).length;

      const seatObj = totalSeat.find(
        t => t.unit === selectedUnit && t.subject === subject
      );

      console.log(seatObj)
      const seats = seatObj ? seatObj.seats : 5;
      const empty = Math.max(seats - filled, 0);
      const percentage = Math.min((filled / seats) * 100, 100);

      return { subject, filled, empty, seats, percentage };
    });
  }, [applications, selectedUnit, totalSeat]);

  if (!selectedUnit || selectedUnit === "all") return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full xl:w-60">
        <Cselect
          name="subject"
          control={control as unknown as Control<FormValues>}
          placeholder="Select Subject"
          options={subjectOptions}
        />
      </div>

      <div className="mt-4 space-y-6">
        {progressData
          .filter(({ subject }) =>
            selectedSubject === "all" ||
            selectedSubject === subject.toLowerCase().replace(/\s+/g, "_")
          )
          .map(({ subject, filled, empty, seats, percentage }) => (
            <div key={subject} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{subject}</span>
                <span>{seats} total</span>
              </div>
              <Progress value={percentage} className="h-4 rounded-lg" />
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

export default UnitProgress;
