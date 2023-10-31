import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function DELETE(request: NextRequest) {
  cookies().delete("MOD_AUTH_CAS");

  return NextResponse.redirect("/");
}
