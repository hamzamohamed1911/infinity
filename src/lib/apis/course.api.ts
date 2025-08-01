"use server";

import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetCourse({
  course_id,
}: {
  course_id: string
}): Promise<APIResponse<CourseType>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/get-course/${course_id}`, {
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
  course_id: string
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
  unit_id: string
}): Promise<APIResponse<CourseDetails>> {
  const token = await getAuthToken();
  console.log("token" ,token)
  const response = await fetch(`${API_URL}api/v1/get-unit/${unit_id}`, {
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