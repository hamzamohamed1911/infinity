import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { courseId } = body;

  const response = NextResponse.json({ success: true });
  response.cookies.set("selected_course_id", courseId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, 
  });

  return response;
}
