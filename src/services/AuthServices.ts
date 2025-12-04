/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }
    revalidateTag("Users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(userData),
    });

    const result = await res.json();

  

    if (result.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};


export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    
    return true;
  } catch (error) {
    return false;
  }
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUsers = async (email:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/${email}`, {
      next: {
        tags: ["Users"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const UpdateUser = async (brandData: FieldValues, id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/${id}`, {
      method: "PUT",
      body: JSON.stringify(brandData),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    revalidateTag("Users");

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};


