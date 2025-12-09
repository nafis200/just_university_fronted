/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// -------------------- Exam Application --------------------

export const createExamApplication = async (data: { applyStartDate: string; applyEndDate: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return [];
  }
};

export const getAllExamApplications = async (): Promise<any[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // ALWAYS FRESH
      }
    );

    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
};

export const deleteExamApplication = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-application/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    return await res.json();
  } catch {
    return [];
  }
};

// -------------------- Exam Announcement --------------------

export const createExamAnnouncement = async (data: { title: string; unit: string; examDate: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return [];
  }
};

export const getAllExamAnnouncements = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ALWAYS FRESH
    });

    const result = await res.json();
    return result.data || [];
  } catch {
    return [];
  }
};

export const deleteExamAnnouncement = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/exam-notice/exam-announcement/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    return await res.json();
  } catch {
    return [];
  }
};

// -------------------- Google Drive Files --------------------

export const uploadFileToDrive = async (file: File, title: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/google/upload-file`, {
      method: "POST",
      cache: "no-store",
      body: formData,
    });

    return await res.json();
  } catch {
    return [];
  }
};

export const getAllFilesFromDrive = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/google/files`, {
      method: "GET",
      cache: "no-store", 
    });

    const result = await res.json();
    return result.data;
  } catch {
    return [];
  }
};

export const deleteFileFromDrive = async (fileId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/google/delete-file/${fileId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    return await res.json();
  } catch (error) {
    return [];
  }
};

// -------------------- Others Announcements --------------------

export const createOthersAnnouncement = async (data: { title: string; date: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/others-notice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return [];
  }
};

export const getAllOthersAnnouncements = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/others-notice`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
};

export const deleteOthersAnnouncement = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/others-notice/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  } catch {
    return [];
  }
};
