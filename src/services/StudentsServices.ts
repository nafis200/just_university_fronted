/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { FieldValues } from "react-hook-form";

// ---------------- Personal Info ----------------
export const createPersonalInfo: any = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/personalInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error: any) {
    return [];
  }
};

export const fetchPersonalInfo = async (searchTerm: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/fetch?searchTerm=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    return result.data;

  } catch (error: any) {
    console.error("Error fetching personal info:", error);
    return [];
  }
};

// ---------------- Guardian Info ----------------
export const createGuardianInfo = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/guardian`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error: any) {
    return [];
  }
};

// ---------------- Educational Info ----------------
export const createEducationalInfo = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/educational`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error: any) {
    return [];
  }
};

// ---------------- Address Info ----------------
export const createAddressInfo = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error: any) {
    return [];
  }
};

// ---------------- Others Info ----------------
export const createOthersInfo = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/othersInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error) {
    return [];
  }
};

// ---------------- Generate PDF ----------------
export const generatePdf = async (pdfData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/pdf/pdfreader`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfData),
      }
    );

    if (!res.ok) {
      return { success: false, message: "Server Error!" };
    }

    const blob = await res.blob();
    return { success: true, blob };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ---------------- Department Status ----------------
export const fetchDepartmentStatus = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/department-status`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch department status");

    const result = await res.json();
    return result.data;

  } catch (error: any) {
    return [];
  }
};

// ---------------- Others Info Role ----------------
export const createOthersInfoRole = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/role`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    return result;

  } catch (error) {
    return [];
  }
};



export const getDateApplicationByGstApplicationId = async (gstApplicationId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/excel/${gstApplicationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const re = await res.json();
    return re.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateDateApplicationByGstApplicationId = async (
  gstApplicationId: string,
  applyEndDate: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/excel/${gstApplicationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applyEndDate }),
      }
    );

    if (!res.ok) throw new Error("Failed to update data");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const updateStatusApplicationByGstApplicationId = async (
  gstApplicationId: string,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/excel/update/${gstApplicationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to update data");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

