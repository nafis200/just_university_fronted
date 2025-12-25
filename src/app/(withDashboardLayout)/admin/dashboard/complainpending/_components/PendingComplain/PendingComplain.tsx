"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import { NMTable } from "@/components/Resuable_Table/core/NMTable";
import { showToast } from "@/components/resuble_toast/toast";
import { updateDateApplicationByGstApplicationId } from "@/services/StudentsServices";
import { updateComplainStatus } from "@/services/ComplainServices";

interface Complain {
  id: number;
  gstApplicationId: string;
  complain: string;
  status: boolean;
}

interface Props {
  initialData: Complain[];
}

export default function ComplainTableClient({ initialData }: Props) {
  const router = useRouter();
  const [selectedComplain, setSelectedComplain] =
    useState<Complain | null>(null);
  const [examDate, setExamDate] = useState("");

  const handleSubmitDate = async () => {
    if (!examDate || !selectedComplain) {
      showToast("তারিখ নির্বাচন করুন", "error");
      return;
    }

    const res = await updateDateApplicationByGstApplicationId(
      selectedComplain.gstApplicationId,
      examDate
    );

    if (res) {
      await updateComplainStatus(selectedComplain.gstApplicationId);
      showToast("সফলভাবে আপডেট হয়েছে", "success");
      setSelectedComplain(null);
      setExamDate("");
      router.refresh();
    }
  };

  const columns: ColumnDef<Complain>[] = [
    {
      accessorKey: "gstApplicationId",
      header: "GST Application ID",
    },
    {
      header: "Status",
      cell: () => (
        <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-600">
          Pending
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => setSelectedComplain(row.original)}
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <NMTable data={initialData} columns={columns} />

      {selectedComplain && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-linear-to-br from-indigo-50 to-white rounded-xl w-[360px] md:w-[800px] shadow-xl p-5 relative">
            <button
              onClick={() => setSelectedComplain(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-indigo-700 mb-3 text-center">
              অভিযোগের বিস্তারিত
            </h2>

            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <span className="font-medium">GST আবেদন নম্বর:</span>{" "}
                {selectedComplain.gstApplicationId}
              </p>

              <p className="bg-indigo-50 p-3 rounded text-gray-800">
                {selectedComplain.complain}
              </p>
            </div>

            <input
              type="datetime-local"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="border mt-4 px-3 py-2 rounded w-full text-sm"
            />

            <button
              onClick={handleSubmitDate}
              className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              তারিখ নির্ধারণ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
