/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// ---------------- Upload Excel ----------------

"use server"; // Server-side function

import { cookies } from "next/headers";

export const uploadExcel = async (file: File) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value; 

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/excel/file`, {
      method: "POST",
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}), 
      },
      credentials: "include", 
    });

    if (!res.ok) {
      throw new Error("Failed to upload Excel file");
    }

    const result = await res.json();
    return result;

  } catch (error: any) {
    console.error("Server-side Excel upload error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};


// ---------------- Fetch Users except Students ----------------

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
    console.error("Error fetching users:", error);
    return [];
  }
};


// ---------------- Update User Status ----------------

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
    return result;

  } catch (error: any) {
    console.error("Error updating user status:", error);
    return null;
  }
};


// ---------------- Fetch Applicants ----------------

export interface FetchApplicantsParams {
  subject?: string;
  search?: string;
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
    queryParams.append("notDepartment", "null");

    if (subject) queryParams.append("department", subject);
    if (unit) queryParams.append("unit", unit);
    if (search) queryParams.append("searchTerm", search);

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/fetch?${queryParams.toString()}`,
      { method: "GET" }
    );

    if (!res.ok) throw new Error(`Failed to fetch applicants: ${res.status}`);

    const result = await res.json();
    return result.data;

  } catch (error: any) {
    return [];
  }
};
