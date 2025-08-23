"use server";

import { getAuthToken } from "../utils/auth-token";
import { revalidatePath, revalidateTag } from "next/cache";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface SubscribeBody {
  teacher_id: number;
  state_id?: number;
  type: number;
  group_id?: number;
  center_id?: number;
  parent_phone?: string;
}

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
  revalidateTag("profile");
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
  revalidateTag("profile");
  if (!response.ok) {
    throw new Error(result?.message || "فشل في الفاء الاشتراك");
  }

  return result;
}
export async function GetClassesData({
  teacherId,
}: {
  teacherId: number;
}): Promise<APIResponse<Dclasses[]>> {
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
export async function changePassword(payload: ChangePasswordPayload) {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${API_URL}api/v1/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to change password: ${errorText || res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in changePassword:", error);
    throw error;
  }
}
export async function UpdateProfilePicture(formData: FormData) {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}api/v1/user/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to update profile picture: ${errorText || res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error in Update Profile Picture:", error);
    throw error;
  }
}
