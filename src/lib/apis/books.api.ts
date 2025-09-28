"use server";

import { BooksApiResponse } from "../types/books";
import { getAuthToken } from "../utils/auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetBooks({
  page = 1,
  per_page = 12,
}: {
  page?: number;
  per_page?: number;
}): Promise<BooksApiResponse> {
  const token = await getAuthToken();
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", per_page.toString());

  const url = `${API_URL}api/v1/books/?${params.toString()}`;

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

  const payload = await response.json();

  return payload;
}
export async function GetBook({ id }: { id: string }) {
  const token = await getAuthToken();
  const url = `${API_URL}api/v1/get-book/${id}`;

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

  const payload = await response.json();

  return payload;
}
