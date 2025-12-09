"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { showToast } from "@/components/resuble_toast/toast";
import {
  deleteExamApplication,
  deleteExamAnnouncement,
  deleteOthersAnnouncement,
} from "@/services/ExamNoticesServices";

interface ExamApplication {
  id: string;
  applyStartDate: string;
  applyEndDate: string;
}

interface ExamAnnouncement {
  id: string;
  title: string;
  unit: "SCIENCE" | "ARTS" | "COMMERCE";
  examDate: string;
}

interface OthersAnnouncement {
  id: string;
  title: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  applications: ExamApplication[];
  announcements: ExamAnnouncement[];
  otherAnnouncements: OthersAnnouncement[];
}

export default function ExamDashboardClient({
  applications,
  announcements,
  otherAnnouncements,
}: Props) {
  const router = useRouter();

  const formatUnit = (unit: string) => {
    switch (unit) {
      case "SCIENCE":
        return "A (বিজ্ঞান)";
      case "ARTS":
        return "B (মানবিক)";
      case "COMMERCE":
        return "C (ব্যবসায়)";
      default:
        return unit;
    }
  };

  const isExpired = (dateStr: string) => new Date(dateStr) < new Date();

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Are you sure to delete this application?")) return;

    const res = await deleteExamApplication(id);

    if (res.success) {
      showToast("Application deleted!", "success");
      router.refresh(); // 🔥 Re-fetch from server
    } else {
      showToast(res.message || "Failed to delete", "error");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure to delete this announcement?")) return;

    const res = await deleteExamAnnouncement(id);

    if (res.success) {
      showToast("Announcement deleted!", "success");
      router.refresh(); // 🔥 Re-fetch updated data
    } else {
      showToast(res.message || "Failed to delete", "error");
    }
  };

  const handleDeleteOthers = async (id: string) => {
    if (!confirm("Are you sure to delete this information?")) return;

    const res = await deleteOthersAnnouncement(id);

    if (res.success) {
      showToast("তথ্য মুছে ফেলা হয়েছে!", "success");
      router.refresh(); 
    } else {
      showToast(res.message || "Failed to delete", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 grid gap-10">

      {/* Applications */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">GST আবেদনের গুরুত্বপূর্ণ তারিখ সমূহ</h2>

        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map(app => (
              <div
                key={app.id}
                className={`flex justify-between items-center p-4 border rounded 
                ${isExpired(app.applyEndDate) ? "line-through text-red-600" : ""}`}
              >
                <div>
                  <p>
                    আবেদন শুরু -{" "}
                    {new Date(app.applyStartDate).toLocaleString("bn-BD", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    আবেদন শেষ -{" "}
                    {new Date(app.applyEndDate).toLocaleString("bn-BD", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteApplication(app.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exam Announcements */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">পরীক্ষার সময়সূচি</h2>

        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className={`flex justify-between items-center p-4 border rounded
                ${isExpired(ann.examDate) ? "line-through text-red-600" : ""}`}
              >
                <div>
                  <p>
                    {ann.title} - ইউনিট {formatUnit(ann.unit)}
                  </p>
                  <p>
                    {new Date(ann.examDate).toLocaleString("bn-BD", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteAnnouncement(ann.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Others announcements */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">অন্যান্য তথ্য</h2>

        {otherAnnouncements.length === 0 ? (
          <p>No information found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {otherAnnouncements.map(o => (
              <div
                key={o.id}
                className={`flex justify-between items-center p-4 border rounded
                ${isExpired(o.date) ? "line-through text-red-600" : ""}`}
              >
                <div>
                  <p>{o.title}</p>
                  <p>
                    {new Date(o.date).toLocaleString("bn-BD", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteOthers(o.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
