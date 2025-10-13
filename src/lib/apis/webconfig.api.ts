import { LandingPageResponse } from "../types/landing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWebConfig() {
  const res = await fetch(`${API_URL}api/v1/academy-info?subdomain=amiratest`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
export async function getLandingPage(): Promise<LandingPageResponse | null> {
  try {
    const res = await fetch(`${API_URL}api/v1/teacher/6569`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch landing page:", res.statusText);
      return null;
    }

    const data: LandingPageResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}
