"use server";

import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function GetGroupsList({ center_id }: { center_id: number }): Promise<APIResponse<statelist[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/groups?center_id=${center_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const payload = await response.json();

  if (!payload || !Array.isArray(payload.data)) {
    console.error("رد السيرفر:", payload);
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}

export async function GetCentersList({ teacher_id }: { teacher_id: number }): Promise<APIResponse<statelist[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/centers?teacher_id=${teacher_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
const payload = await response.json();

  if (!payload || !Array.isArray(payload.data)) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
