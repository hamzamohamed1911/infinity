import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { html } = body;

  cookies().set("payment_html", html, { httpOnly: true });

  return NextResponse.json({ success: true });
}
