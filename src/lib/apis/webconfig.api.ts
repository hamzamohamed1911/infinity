const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWebConfig() {
  const res = await fetch(`${API_URL}api/v1/academy-config`, { cache: "no-store" });
  const data = await res.json();
  return data?.data?.mobile_config;
}
