/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


export interface FetchApplicantsParams {
  subject?: string;
  search?: string;
  page?: number;
  limit?: number;
  facultyApproved?: boolean;
}

const getDecodedData = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) return null;

  const decodedData: any = await jwtDecode(accessToken);
  return decodedData;
};

export const fetchApplicants = async ({
  subject,
  search,
  page = 1,
  limit = 10,
  facultyApproved,
}: FetchApplicantsParams): Promise<any> => {
  try {
    const decodedData = await getDecodedData();
    const userUnit = decodedData?.unit;

    const queryParams = new URLSearchParams();

    queryParams.append("role", "STUDENTS");
    queryParams.append("notDepartment", "not-null");

    if (facultyApproved !== undefined)
      queryParams.append("facultyApproved", String(facultyApproved));

    if (userUnit) {
      queryParams.append("unit", userUnit);
    }

    if (subject) queryParams.append("department", subject);
    if (search) queryParams.append("searchTerm", search);

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/api/info/fetch?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch applicants: ${res.status}`);

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    console.error("Error fetching applicants:", error);
    return [];
  }
};

export const AllfetchApplicants = async ({
  subject,
  search,
  page = 1,
  limit = 10,
}: FetchApplicantsParams): Promise<any> => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append("role", "STUDENTS");
    queryParams.append("notDepartment", "null");

    if (subject) queryParams.append("department", subject);
    if (search) queryParams.append("searchTerm", search);

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/api/info/fetch?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch applicants: ${res.status}`);

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    console.error("Error fetching applicants:", error);
    return [];
  }
};
