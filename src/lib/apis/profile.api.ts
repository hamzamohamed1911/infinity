"use server";

import { getAuthToken } from "../utils/auth-token";
import { revalidatePath, revalidateTag } from "next/cache";

interface SubscribeBody {
  teacher_id: number;
  state_id?: number;
  type: number;
  group_id?: number;
  center_id?: number;
  parent_phone?: string;
}
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
    next: { tags: ["profile"] }, 
  });

  const payload: APIResponse<ProfileApiData> = await response.json();

  if (!("success" in payload) || !payload.success) {
    throw new Error("فشل في جلب البيانات");
  }

   return payload;
}
export async function subscribeTeacher(data: SubscribeBody) {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/subscrip-teacher`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidatePath("/profile");
  revalidateTag("profile")
  if (!response.ok) {
    throw new Error(result?.message || "فشل في الاشتراك");
  }

  return result;
}
export async function unsubscrip(data: SubscribeBody) {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/unsubscrip-teacher`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidatePath("/profile");
  revalidateTag("profile")
  if (!response.ok) {
    throw new Error(result?.message || "فشل في الفاء الاشتراك");
  }

  return result;
}
export async function GetClassesData({teacherId}:{teacherId:number}): Promise<APIResponse<Dclasses[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/teacher-course/${teacherId}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<Dclasses[]> = await response.json();

  if (!("success" in payload) || !payload.success) {
    throw new Error("فشل في جلب البيانات");
  }

   return payload;
}