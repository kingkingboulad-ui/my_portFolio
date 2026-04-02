import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
  
    console.log("TOKEN:", token);
    console.log("ROLE:", role);
  
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!token || role !== "admin") {
        console.log("BLOCKED");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  
    return NextResponse.next();
  }

export const config = {
    matcher: ["/admin/:path*"],
  };