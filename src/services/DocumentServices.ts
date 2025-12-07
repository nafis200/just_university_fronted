/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";

export const createDocuments: any = async (documentData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/documents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error creating document:", error);
    return [];
  }
};
