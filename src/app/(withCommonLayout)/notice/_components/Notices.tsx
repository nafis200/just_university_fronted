"use client";

import React from "react";
import Link from "next/link";

interface FileNotice {
  id: string;
  title: string;
  viewLink: string;
  downloadLink?: string;
  createdAt: string;
}

interface ExamApplication {
  id: string;
  applyStartDate: string;
  applyEndDate: string;
  feeLastDate?: string;
  preliminaryExamDate?: string;
}

interface ExamAnnouncement {
  id: string;
  title: string;
  unit: "SCIENCE" | "ARTS" | "COMMERCE" | string;
  examDate: string;
  createdAt: string;
}

interface OthersAnnouncement {
  id: string;
  title: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  files: FileNotice[];
  applications: ExamApplication[];
  announcements: ExamAnnouncement[];
  otherAnnouncements: OthersAnnouncement[];
}

export default function Notices({
  files,
  applications,
  announcements,
  otherAnnouncements,
}: Props) {
  const today = new Date();

  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  const formatUnit = (unit: string) => {
    switch (unit.toUpperCase()) {
      case "SCIENCE":
        return {
          name: "ইউনিট A (বিজ্ঞান)",
          border: "border-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-800",
        };
      case "ARTS":
        return {
          name: "ইউনিট B (মানবিক)",
          border: "border-orange-500",
          bg: "bg-orange-50",
          text: "text-orange-800",
        };
      case "COMMERCE":
        return {
          name: "ইউনিট C (বাণিজ্য)",
          border: "border-green-500",
          bg: "bg-green-50",
          text: "text-green-800",
        };
      default:
        return {
          name: unit,
          border: "border-gray-500",
          bg: "bg-gray-50",
          text: "text-gray-800",
        };
    }
  };

  // Helper function: যদি date পার হয়ে যায়, return true
  const isPast = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) < today;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white rounded-2xl shadow-2xl mb-8 overflow-hidden">
          <div className="relative py-12 px-6 text-center">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide">
                যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়
              </h1>
              <div className="h-1 w-32 bg-yellow-400 mx-auto mb-4 rounded"></div>
              <p className="text-2xl font-semibold text-blue-100">
                ভর্তি আবেদন {academicYear}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Notices */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 flex-1 bg-linear-to-r from-transparent to-blue-500 rounded"></div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 px-4">
                  সকল নোটিশ
                </h2>
                <div className="h-1 flex-1 bg-linear-to-l from-transparent to-blue-500 rounded"></div>
              </div>

              <div className="space-y-3">
                {files.map((file) => (
                  <Link
                    key={file.id}
                    href={file.viewLink}
                    target="_blank"
                    className="group relative p-4 pl-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg hover:bg-blue-100 hover:shadow-md transition-all duration-300 block"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full -ml-2 group-hover:scale-125 transition-transform"></div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {file.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Dates and Exam Schedule */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="bg-gradient from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-bold text-xl">গুরুত্বপূর্ণ তারিখ সমূহ</h3>
              </div>

              <div className="space-y-3 bg-blue-600 rounded-xl p-4 backdrop-blur-sm text-white">
                {applications.map((app) => (
                  <div key={app.id} className="space-y-2">
                    <div
                      className={`flex justify-between items-center py-2 border-b border-white border-opacity-30 ${
                        isPast(app.applyStartDate) ? "text-red-800" : ""
                      }`}
                    >
                      <span className="font-medium">আবেদন শুরু</span>
                      <span
                        className={`font-bold ${
                          isPast(app.applyStartDate) ? "text-red-800" : ""
                        }`}
                      >
                        {new Date(app.applyStartDate).toLocaleDateString(
                          "bn-BD"
                        )}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-2 border-b border-white border-opacity-30 ${
                        isPast(app.applyEndDate) ? "text-red-800" : ""
                      }`}
                    >
                      <span className="font-medium">আবেদন শেষ</span>
                      <span
                        className={`font-bold ${
                          isPast(app.applyEndDate) ? "text-red-800" : ""
                        }`}
                      >
                        {new Date(app.applyEndDate).toLocaleDateString("bn-BD")}
                      </span>
                    </div>
                    {app.feeLastDate && (
                      <div
                        className={`flex justify-between items-center py-2 border-b border-white border-opacity-30 ${
                          isPast(app.feeLastDate)
                            ? "line-through text-red-600"
                            : ""
                        }`}
                      >
                        <span className="font-medium text-sm">
                          ফি জমাদানের শেষ তারিখ
                        </span>
                        <span
                          className={`font-bold ${
                            isPast(app.feeLastDate)
                              ? "line-through text-red-600"
                              : ""
                          }`}
                        >
                          {new Date(app.feeLastDate).toLocaleDateString(
                            "bn-BD"
                          )}
                        </span>
                      </div>
                    )}
                    {app.preliminaryExamDate && (
                      <div
                        className={`flex justify-between items-center py-2 ${
                          isPast(app.preliminaryExamDate)
                            ? "line-through text-red-600"
                            : ""
                        }`}
                      >
                        <span className="font-medium">
                          প্রিলিমিনারি পরীক্ষা
                        </span>
                        <span
                          className={`font-bold ${
                            isPast(app.preliminaryExamDate)
                              ? "line-through text-red-600"
                              : ""
                          }`}
                        >
                          {new Date(app.preliminaryExamDate).toLocaleDateString(
                            "bn-BD"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/*  */}

            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-600">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-xl text-gray-800">
                  অন্যান্য তথ্যসমূহঃ
                </h3>
              </div>

              <div className="space-y-4">
                {otherAnnouncements.map((item) => {
                  const otherDate = new Date(item.date);
                  const isPast = otherDate < new Date();

                  const containerClass = isPast
                    ? "p-4 rounded-xl line-through text-red-600 bg-red-50"
                    : "p-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-50";

                  const textClass = isPast
                    ? "font-bold mb-1 text-red-800"
                    : "font-bold mb-1 text-indigo-800";

                  return (
                    <div key={item.id} className={containerClass}>
                      <p className={textClass}>{item.title}</p>
                      <p className="text-gray-700 text-sm">
                        {otherDate.toLocaleDateString("bn-BD", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        {otherDate.toLocaleTimeString("bn-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*  */}

            {/* Exam Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-600">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-xl text-gray-800">
                  পরীক্ষার সময়সূচিঃ
                </h3>
              </div>

              <div className="space-y-4">
                {announcements.map((ann) => {
                  const unit = formatUnit(ann.unit);
                  const examDate = new Date(ann.examDate);
                  const isExamPast = examDate < today;

                  const containerClass = isExamPast
                    ? "p-4 rounded-xl line-through text-red-600 bg-red-50"
                    : `p-4 rounded-xl border-l-4 ${unit.border} ${unit.bg}`;

                  const textClass = isExamPast
                    ? "font-bold mb-1 text-red-800"
                    : `font-bold mb-1 ${unit.text}`;

                  return (
                    <div key={ann.id} className={containerClass}>
                      <p className={textClass}>{unit.name}</p>
                      <p className="text-gray-700 text-sm">
                        {examDate.toLocaleDateString("bn-BD", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
