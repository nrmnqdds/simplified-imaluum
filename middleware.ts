import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (
    !req.cookies.has("MOD_AUTH_CAS") &&
    req.url !== url.pathname.replace(/\/$/, "")
  ) {
    url.pathname = url.pathname.replace(/\/$/, "");
    return NextResponse.rewrite(url);
  }

  if (
    req.cookies.has("MOD_AUTH_CAS") &&
    req.url === url.pathname.replace(/\/$/, "")
  ) {
    console.log(req.cookies.get("MOD_AUTH_CAS"));
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }
}
