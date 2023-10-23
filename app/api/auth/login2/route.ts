import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { session } = await request.json();

  const url =
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome";

  const cookieStore = cookies();

  // Create an array of cookie strings
  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  console.log("cookieStrings", cookieStrings);

  return NextResponse.json({ cookieStrings });
}
