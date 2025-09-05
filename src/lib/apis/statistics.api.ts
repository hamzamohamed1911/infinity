"use server";

import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetExamStatistics({
  id = 1,
  keyword = "",
  start_date,
  end_date,
  page = 1,
  per_page = 10,
  is_success
}: {
  id: number;
  keyword?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
  is_success?:number;
}): Promise<ApiResponse> {
  const token = await getAuthToken();

  const params = new URLSearchParams();
  if (keyword) params.append("name", keyword);
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (is_success !== undefined) {
  params.append("is_success", is_success.toString());
}

  params.append("page", page.toString());
  params.append("per_page", per_page.toString());

  const url = `${API_URL}api/v1/exam-report/${id}?${params.toString()}`;
  console.log("Request URL:", url);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const payload: ApiResponse = await response.json();
  console.log("response search" ,payload)

  return payload;
}
