"use server";

import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetSearch({
  teacher_id,
  keyword,
}: {
  teacher_id: string;
  keyword: string;
}): Promise<APIResponse<SearchApiData>> {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${API_URL}api/v1/teacher/${teacher_id}/search?q=${keyword}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // لو الـ API رجّعت خطأ HTTP
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const payload: APIResponse<SearchApiData> = await response.json();
    return payload;
} catch (error: unknown) {
  let message = "Something went wrong";
  if (error instanceof Error) {
    message = error.message;
  }
  return {
    success: false,
    message,
  } as APIResponse<SearchApiData>;
}}