"use server";

import { redirect } from "next/navigation";
import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetCourse({
  course_id,
}: {
  course_id: string;
}): Promise<APIResponse<CourseType>> {
  const token = await getAuthToken();
  console.log("token", token);
  const response = await fetch(`${API_URL}api/v1/get-course/${course_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      type: "web",
      Accept: "application/json",
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
export async function GetCoursesbundles({
  course_id,
}: {
  course_id: string;
}): Promise<APIResponse<CourseType[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/bundles/${course_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!payload || !payload.data) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
export async function GetUnits({
  course_id,
}: {
  course_id: string;
}): Promise<APIResponse<CourseDetails[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/units/${course_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!payload || !payload.data) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
export async function GetUnit({
  unit_id,
}: {
  unit_id: string;
}): Promise<APIResponse<CourseDetails>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/get-unit/${unit_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      type: "web",
      Accept: "application/json",
    },
  });

  const payload = await response.json();

  if (payload?.message === "Unauthenticated.") {
    redirect("/logout");
  }
  if (!response.ok) {
    throw new Error(
      payload?.message || payload?.error || "فشل في جلب البيانات"
    );
  }

  if (!payload || !payload.data) {
    throw new Error(
      payload?.message || payload?.error || "فشل في جلب البيانات"
    );
  }

  return payload;
}

export async function GetLessons({
  course_id,
}: {
  course_id: string;
}): Promise<APIResponse<CourseDetails[]>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/lessons/${course_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!payload || !payload.data) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
export async function GetLesson({
  lesson_id,
}: {
  lesson_id: string;
}): Promise<APIResponse<LessonDetails>> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}api/v1/lesson/${lesson_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "حدث خطأ أثناء جلب الدرس");
  }

  if (payload?.error) {
    throw payload.error;
  }

  return payload;
}

export async function GetBundle({
  bundle_id,
}: {
  bundle_id: string;
}): Promise<APIResponse<BundleDetails>> {
  const token = await getAuthToken();
  console.log("token", token);
  const response = await fetch(`${API_URL}api/v1/show-bundle/${bundle_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!payload || !payload.data) {
    throw new Error("فشل في جلب البيانات");
  }

  return payload;
}
