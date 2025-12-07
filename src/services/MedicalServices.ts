/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export interface FetchApplicantsParams {
  subject?: string;
  search?: string;
  page?: number;
  limit?: number;
  medicalApproved?: boolean;
  unit?: string;
}

export const MedicalfetchApplicants = async ({
  subject,
  search,
  page = 1,
  limit = 10,
  unit,
  medicalApproved,
}: FetchApplicantsParams): Promise<any> => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append("role", "STUDENTS");

    if (medicalApproved !== undefined)
      queryParams.append("medicalApproved", String(medicalApproved));

    if (unit) queryParams.append("unit", unit);
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

export const AllRegisterfetchApplicants = async ({
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
