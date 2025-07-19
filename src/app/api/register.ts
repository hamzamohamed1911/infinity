// api/register.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTeachers = async (): Promise<TeachersResponse> => {
  const response = await fetch(`${API_URL}api/v1/teachers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teachers count");
  }

  const data = await response.json();
  return data;
};
export const registerUser = async (data: {
  name: string;
  email: string;
  phone: string;
  parent_phone: string;
  password: string;
  password_confirmation: string;
  state_id: string;
  classroom_id: string;
}) => {
  const response = await fetch(`${API_URL}api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};
export const registerWithSubscribe = async (data: {
  name: string;
  email: string;
  phone: string;
  parent_phone: string;
  password: string;
  password_confirmation: string;
  state_id: string;
  classroom_id: string;
  teacher_id: string;
  type: string;
  center_id?: string;
  group_id?: string;
}) => {
  const response = await fetch(`${API_URL}api/v1/register-with-Subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration with subscribe failed");
  }

  return response.json();
};