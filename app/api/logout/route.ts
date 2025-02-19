import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  // Clear the cookie
  (await cookies()).delete("MOD_AUTH_CAS");

  return NextResponse.json({ success: true }, { status: 200 });
}
