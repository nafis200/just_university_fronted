/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


export const createComplain = async (gstApplicationId: string, complain: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/info/complains`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gstApplicationId, complain }),
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    console.error("Error creating complain:", error);
    return null;
  }
};



export const updateComplainStatus = async (gstApplicationId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/info/complains/${gstApplicationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    console.error("Error updating complain status:", error);
    return null;
  }
};


export const fetchComplains = async (searchTerm: string = "", status: boolean = true) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/info/complains?searchTerm=${searchTerm}&status=${true}`,
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
    console.error("Error fetching complains:", error);
    return [];
  }
};


