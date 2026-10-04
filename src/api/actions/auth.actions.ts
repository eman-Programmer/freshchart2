"use server";
import { cookies } from "next/headers";

export async function registerUser(data: any) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
  };
}

