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
  createOthersAnnouncement,
} from "@/services/ExamNoticesServices";

import { showToast } from "@/components/resuble_toast/toast";

export default function AllFormsPage() {
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
      examDate: new Date(examDate).toISOString(),
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

  const [othersTitle, setOthersTitle] = useState("");
  const [othersDate, setOthersDate] = useState("");
  const [loadingOthers, setLoadingOthers] = useState(false);

  const handleOthersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!othersTitle || !othersDate) {
      showToast("অনুগ্রহ করে সব ঘর পূরণ করুন!", "warning");
      return;
    }

    setLoadingOthers(true);
    const result = await createOthersAnnouncement({
      title: othersTitle,
      date: new Date(othersDate).toISOString(),
    });
    setLoadingOthers(false);

    if (result.success) {
      showToast("তথ্য সফলভাবে সংরক্ষণ হয়েছে!", "success");
      setOthersTitle("");
      setOthersDate("");
    } else {
      showToast(result.message || "তথ্য সংরক্ষণ ব্যর্থ হয়েছে", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 grid gap-10">
      {/* Exam Announcement */}
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

      {/* Others Information Form */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">অন্যান্য তথ্য</h2>
        <form className="flex flex-col gap-4" onSubmit={handleOthersSubmit}>
          <div>
            <Label className="mb-3 block">অন্যান্য তথ্য</Label>
            <Select value={othersTitle} onValueChange={setOthersTitle}>
              <SelectTrigger>
                <SelectValue placeholder="একটি অপশন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="অ্যাডমিট কার্ড ডাউনলোড">
                  অ্যাডমিট কার্ড ডাউনলোড
                </SelectItem>
                <SelectItem value="সাক্ষাৎকার — বিজ্ঞান ইউনিট">
                  সাক্ষাৎকার — বিজ্ঞান ইউনিট
                </SelectItem>
                <SelectItem value="সাক্ষাৎকার — মানবিক ইউনিট">
                  সাক্ষাৎকার — মানবিক ইউনিট
                </SelectItem>
                <SelectItem value="সাক্ষাৎকার — বাণিজ্য ইউনিট">
                  সাক্ষাৎকার — বাণিজ্য ইউনিট
                </SelectItem>
                <SelectItem value="আর্কিটেকচার পরীক্ষা তারিখ">
                  আর্কিটেকচার পরীক্ষা তারিখ
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-3">তারিখ ও সময়</Label>
            <Input
              type="datetime-local"
              value={othersDate}
              onChange={(e) => setOthersDate(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loadingOthers}>
            {loadingOthers ? "Submitting..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
}
