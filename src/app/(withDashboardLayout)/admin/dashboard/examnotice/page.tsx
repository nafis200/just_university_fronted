"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createExamAnnouncement,
  createExamApplication,
} from "@/services/ExamNoticesServices"; 
import { showToast } from "@/components/resuble_toast/toast";

export default function ExamFormsPage() {

  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loadingAnn, setLoadingAnn] = useState(false);

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !unit || !examDate) {
      showToast("Please fill all announcement fields", "warning");
      return;
    }

    setLoadingAnn(true);
    const result = await createExamAnnouncement({
      title,
      unit,
      examDate: new Date(examDate).toISOString(), // ISO format
    });
    setLoadingAnn(false);

    if (result.success) {
      showToast("Exam announcement created!", "success");
      setTitle("");
      setUnit("");
      setExamDate("");
    } else {
      showToast(result.message || "Failed to create announcement", "error");
    }
  };


  const [applyStartDate, setApplyStartDate] = useState("");
  const [applyEndDate, setApplyEndDate] = useState("");
  const [loadingApp, setLoadingApp] = useState(false);

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyStartDate || !applyEndDate) {
      showToast("Please fill both dates", "warning");
      return;
    }

    setLoadingApp(true);
    const result = await createExamApplication({
      applyStartDate: new Date(applyStartDate).toISOString(),
      applyEndDate: new Date(applyEndDate).toISOString(),
    });
    setLoadingApp(false);

    if (result.success) {
      showToast("Exam application created!", "success");
      setApplyStartDate("");
      setApplyEndDate("");
    } else {
      showToast(result.message || "Failed to create application", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 grid gap-10">
 
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exam Announcement</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleAnnouncementSubmit}
        >
          <div>
            <Label className="mb-3">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div>
            <Label className="mb-3">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                <SelectItem value="COMMERCE">COMMERCE</SelectItem>
                <SelectItem value="ARTS">ARTS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-3">Exam Date</Label>
            <Input
              type="datetime-local"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loadingAnn}>
            {loadingAnn ? "Submitting..." : "Create Announcement"}
          </Button>
        </form>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exam Application</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleApplicationSubmit}
        >
          <div>
            <Label className="mb-3">Apply Start Date</Label>
            <Input
              type="datetime-local"
              value={applyStartDate}
              onChange={(e) => setApplyStartDate(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-3">Apply End Date</Label>
            <Input
              type="datetime-local"
              value={applyEndDate}
              onChange={(e) => setApplyEndDate(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loadingApp}>
            {loadingApp ? "Submitting..." : "Create Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
