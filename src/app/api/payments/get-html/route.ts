// app/api/payments/get-html/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const paymentCookie = cookieStore.get("payment_html");

  const html = paymentCookie ? paymentCookie.value : null;
  return NextResponse.json({ html });
}
