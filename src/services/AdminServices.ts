/* eslint-disable @typescript-eslint/no-unused-vars */
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
    return [];
  }
};


export const fetchUsersExcludingStudents = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/fetch?excludeRole=STUDENTS`,
      {
        method: "GET",
        cache: "no-store",
        next: { tags: ["Users"] }
      }
    );

    const result = await res.json();

    return result.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
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



export interface FetchApplicantsParams {
  subject?: string;
  search?:string;
  unit?: string;
  page?: number;
  limit?: number;
}

export const fetchApplicants = async ({
  subject,
  search,
  unit,
  page = 1,
  limit = 10,
}: FetchApplicantsParams): Promise<any> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("role", "STUDENTS");
    queryParams.append("notDepartment","null");
    if (subject) queryParams.append("department", subject);
    if (unit) queryParams.append("unit", unit);
    if (search) {
  queryParams.append("searchTerm", search);
}
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/fetch?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch applicants: ${res.status}`);

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return [];
  }
};






