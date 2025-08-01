//auth.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const forgotPassword = async (phone: string) => {
  try {
    const formData = new FormData();
    formData.append("phone", phone);
    const response = await fetch(`${API_URL}api/v1/reset-password`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const sendCode = async (phone: string, code:string) => {
  try {
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("code", code);
    const response = await fetch(`${API_URL}api/v1/verify-code`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const ResendCode = async (phone: string) => {
  try {
    const formData = new FormData();
    formData.append("phone", phone);
    const response = await fetch(`${API_URL}api/v1/resend-code`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export const updatPassword = async (phone: string, password:string) => {
  try {
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);
    const response = await fetch(`${API_URL}api/v1/update-password`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("خطأ غير معروف");
  }
};
export async function GetStateList(): Promise<APIResponse<statelist[]>> {
  const response = await fetch(`${API_URL}api/v1/government`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<statelist[]> = await response.json();

  if (!("success" in payload) || !payload.success) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
export async function GetClassroomsList(): Promise<APIResponse<statelist[]>> {
  const response = await fetch(`${API_URL}api/v1/classrooms`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<statelist[]> = await response.json();

  if (!("success" in payload) || !payload.success) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}