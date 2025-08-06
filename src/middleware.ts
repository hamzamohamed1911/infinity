import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
      return NextResponse.next();
    }

    if (pathname === "/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/my-classes", req.url));
    }

    // حماية صفحة my-classes
    if (pathname.startsWith("/my-classes") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

 if (!req.nextauth.token && !["/login", "/register", "/forgot-password"].includes(pathname)) {
  return NextResponse.redirect(new URL("/login", req.url));
}


    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
