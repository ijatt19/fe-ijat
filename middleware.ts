import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isLogin = nextUrl.pathname === "/";

  // 1. Kalau akses Dashboard tapi belum login -> Tendang ke Login
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // 2. Kalau akses Login tapi sudah login -> Masuk ke Dashboard
  if (isLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
