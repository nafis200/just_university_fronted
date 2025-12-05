/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

export const uploadExcel = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/excel/file`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();

    revalidateTag("students");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const fetchUsersExcludingStudents = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/fetch?excludeRole=STUDENTS`,
      {
        method: "GET",
      }
    );

    const result = await res.json();

    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (gstApplicationId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gstApplicationId }),
      }
    );

    if (!res.ok) throw new Error("Failed to update user status");

    const result = await res.json();

    revalidateTag("students");

    return result;
  } catch (error: any) {
    console.error("Error updating user status:", error);
    return null;
  }
};