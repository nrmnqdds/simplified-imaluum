import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = "sin1";

export async function GET(request: NextRequest) {
  if (!cookies().has("MOD_AUTH_CAS")) {
    return NextResponse.json({ message: "not okay" });
  }

  return NextResponse.json({ message: "okay" });
}