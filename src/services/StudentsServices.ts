/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

export const createPersonalInfo:any = async (userData: FieldValues) => {
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

    revalidateTag("students");

    return result;

  } catch (error: any) {
    return Error(error);
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
        cache: "force-cache",
        next: { tags: ["students"] }
      }
    );

    const result = await res.json();
    return result.data;

  } catch (error: any) {
    console.error("Error fetching personal info:", error);
    return Error(error);
  }
};




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

    // Only revalidate students tag
    revalidateTag("students");

    return result;

  } catch (error: any) {
    return Error(error);
  }
};


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

    revalidateTag("students");

    return result;

  } catch (error: any) {
    return Error(error);
  }
};


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

    revalidateTag("students");

    return result;

  } catch (error: any) {
    return Error(error);
  }
};


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

    revalidateTag("students");

    return result;

  } catch (error: any) {
    return Error(error);
  }
};