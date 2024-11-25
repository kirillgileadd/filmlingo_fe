import { ACCESS_TOKEN } from "@/src/shared/lib/const";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN);

  console.log(accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/testt"],
};
