// app/api/payments/get-html/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const html = cookies().get("payment_html")?.value || null;
  return NextResponse.json({ html });
}
