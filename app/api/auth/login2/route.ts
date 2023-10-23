import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url =
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome";

  const cookieStore = cookies();

  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return NextResponse.json({ cookieStrings });
}

export async function POST(request: NextRequest) {
  const url =
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome";

  const cookieStore = cookies();

  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return NextResponse.json({ cookieStrings });
}
