"use server";
import { getAuthToken } from "../utils/auth-token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetExam({
  exam_id,
}: {
  exam_id: string;
}): Promise<APIResponse<ExamDetails>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}api/v1/exams/${exam_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();
  return payload;
}
