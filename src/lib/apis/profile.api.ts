"use server";

import { getAuthToken } from "../utils/auth-token";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetProfileData(): Promise<APIResponse<ProfileApiData>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/profile`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<ProfileApiData> = await response.json();

  if (!("success" in payload) || !payload.success) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
