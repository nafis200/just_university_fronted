/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";

export const fetchDepartmentStatus = async ({
  adminApproved,
  facultyApproved,
  deanApproved,
  registerApproved,
  hallRegisterApproved,
  medicalApproved,
  unit,
  department,
  searchTerm,
  page,
  limit
}: {
  adminApproved?: boolean;
  facultyApproved?: boolean;
  deanApproved?: boolean;
  registerApproved?: boolean;
  hallRegisterApproved?: boolean;
  medicalApproved?: boolean;
  unit?: string;
  department?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

    const queryParams = new URLSearchParams();

    queryParams.append("role", "STUDENTS");
    queryParams.append("notDepartment", "not-null");

    if (adminApproved !== undefined)
      queryParams.append("adminApproved", String(adminApproved));
    if (facultyApproved !== undefined)
      queryParams.append("facultyApproved", String(facultyApproved));
    if (deanApproved !== undefined)
      queryParams.append("deanApproved", String(deanApproved));
    if (registerApproved !== undefined)
      queryParams.append("registerApproved", String(registerApproved));
    if (hallRegisterApproved !== undefined)
      queryParams.append("hallRegisterApproved", String(hallRegisterApproved));
    if (medicalApproved !== undefined)
      queryParams.append("medicalApproved", String(medicalApproved));

    if (unit) queryParams.append("unit", unit);
    if (department) queryParams.append("department", department);
    if (searchTerm) queryParams.append("searchTerm", searchTerm);

    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));

    const fullUrl = `${baseUrl}/api/info/fetch?${queryParams.toString()}`;

    const res = await fetch(fullUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch department status");
    }

    const data = await res.json();
    return data.data;

  } catch (error: any) {
    console.error("Error fetching department status:", error);
    return [];
  }
};



export const createApproved = async (approvedData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/approved`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(approvedData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create approved info");
    }

    const result = await res.json();
    return result;

  } catch (error: any) {
    console.error("Error creating approved info:", error);
    return [];
  }
};
