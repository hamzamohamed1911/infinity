/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function chargeCode({
  model_type,
  model_id,
  provider,
  code,
}: {
  model_type: string;
  model_id: number;
  provider: string;
  code?: string;
}) {
  try {
    const body = { model_type, model_id, provider, ...(code && { code }) };
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}api/v1/charge-by-code`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        type: "web",
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type");
    const isJSON = contentType?.includes("application/json");

    // لو فيه خطأ من السيرفر
    if (!res.ok) {
      if (res.status === 429) {
        return {
          success: false,
          message: "تم تجاوز عدد المحاولات، حاول مرة أخرى بعد فترة.",
        };
      }

      if (!isJSON) {
        return {
          success: false,
          message: "البوابة غير متاحة حالياً. حاول لاحقاً.",
        };
      }

      const errorData = await res.json();
      return { success: false, message: errorData?.message || "حدث خطأ." };
    }

    if (isJSON) {
      return await res.json();
    }

    // لو response HTML
    const html = await res.text();
    return { data: { page: html } };
  } catch (error: any) {
    console.error("Error in chargeCode:", error);
    return { success: false, message: error.message || "حدث خطأ." };
  }
}
