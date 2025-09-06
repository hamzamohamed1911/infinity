"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
   if (payload?.message === "Unauthenticated.") {
      redirect("/logout");
    }
  return payload;
}
export async function joinExam({
  exam_id,
  unit_id,
  exam_parent_id,
}: {
  exam_id: number;
  unit_id?: string;
  exam_parent_id: string;
}) {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_URL}api/v1/exams/join/${exam_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || "Failed to join exam");
    }

    const path = `/${unit_id}/${exam_parent_id}/exams/${exam_id}/exam`;
    revalidatePath(path);

    return payload;
  } catch (error) {
    console.error("Error joining exam:", error);
    throw error;
  }
}
export async function saveAnswer(
  payload: SaveAnswerPayload,
  examId: number | string
) {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${API_URL}api/v1/exams/save-answer/${examId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // لازم تضيفها
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to save answer: ${errorText || res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in saveAnswer:", error);
    throw error;
  }
}
export async function submitAnswer(
  examId: number | string,
  answers: QuestionAnswer[]
) {
  const token = await getAuthToken();

  const payload = {
    answers: answers.map((a) => ({
      question_id: a.question_id,
      question_type: a.question_type,
      answer: a.question_type === "radio" ? Number(a.answer) : String(a.answer),
      ...(a.question_type !== "radio" && { url: a.url || "" }),
    })),
  };

  const res = await fetch(`${API_URL}api/v1/exams/submit/${examId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to submit answer: ${errorText}`);
  }

  return res.json();
}
export async function GetExams({
  course_id,
  assessment_type=1,
}: {
  course_id: string;
  assessment_type: number;
}): Promise<APIResponse<ExamDetails[]>> {
  const token = await getAuthToken();
  const response = await fetch(
    `${API_URL}api/v1/exams?course_id=${course_id}&assessment_type=${assessment_type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const payload = await response.json();
  if (payload?.message === "Unauthenticated.") {
      redirect("/logout");
    }
  return payload;
}
