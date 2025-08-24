"use server";

import { redirect } from "next/navigation";
import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAds(): Promise<APIResponse<ads[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/ads`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();
  if (payload?.message === "Unauthenticated.") {
    redirect("/logout");
  }
  if (!payload || !payload.data) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
