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
  model_id: string;
  provider: string;
  code?: string;
}) {
  try {
    const formData = new FormData();
    formData.append("model_type", model_type);
    formData.append("model_id", model_id);
    formData.append("provider", provider);
    if (code) {
      formData.append("code", code);
    }

    const token = await getAuthToken();
    const res = await fetch(`${API_URL}api/v1/charge-by-code`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        type: "web",
      },
      body: formData,
    });

    if (!res.ok) {
      let errorMessage = `Failed: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const errorText = await res.text();
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }

    // ✅ هنا بنشوف نوع المحتوى
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const html = await res.text();
      return { data: { page: html } };
    }
  } catch (error) {
    console.error("Error in chargeCode:", error);
    throw error;
  }
}
