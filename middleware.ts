import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");
  const path = req.nextUrl.pathname;

  // Protect admin/owner routes
  if (!token && (path.startsWith("/admin") || path.startsWith("/owner"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logging (dev mode)
  if (process.env.NODE_ENV === "development") {
    console.log(`[REQ] ${req.method} ${path}`);
  }

  return NextResponse.next();
}