import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { html } = body;
  const cookieStore = await cookies();
  cookieStore.set("payment_html", String(html), { httpOnly: true });

  return NextResponse.json({ success: true });
}
