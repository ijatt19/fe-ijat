import { auth } from "@/auth"; // Import auth dari file auth.ts kamu
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  const isAuthRoute = nextUrl.pathname === "/";

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
