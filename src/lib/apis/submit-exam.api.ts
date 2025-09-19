// exams.api.ts (function pure)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function saveAnswer(
  formData: FormData,
  examId: number | string,
  token: string
) {
  const res = await fetch(`${API_URL}api/v1/exams/save-answer/${examId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      type: "web",
      Accept: "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function submitAnswer(
  examId: number | string,
  formData: FormData,
  token: string
) {
  const res = await fetch(`${API_URL}api/v1/exams/submit/${examId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      type: "web",
      Accept: "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
