/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";


export const createExamApplication = async (data: { applyStartDate: string; applyEndDate: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("ExamApplication");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllExamApplications = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
      next: { tags: ["ExamApplication"] },
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteExamApplication = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    revalidateTag("ExamApplication");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const createExamAnnouncement = async (data: { title: string; unit: string; examDate: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("ExamAnnouncement");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllExamAnnouncements = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
      next: { tags: ["ExamAnnouncement"] },
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteExamAnnouncement = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    revalidateTag("ExamAnnouncement");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const uploadFileToDrive = async (file: File, title: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/google/upload-file`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    revalidateTag("GoogleFiles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllFilesFromDrive = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/google/files`, {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["GoogleFiles"] },
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteFileFromDrive = async (fileId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/google/delete-file/${fileId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    revalidateTag("GoogleFiles");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
