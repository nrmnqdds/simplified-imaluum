import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function DELETE() {
  cookies().delete("MOD_AUTH_CAS");
  cookies().delete("laravel_session");
  cookies().delete("XSRF-TOKEN");

  return NextResponse.redirect("/");
}
