import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const res = await fetch("https://api.nrmnqdds.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Invalid credentials.");
  }

  const json = await res.json();

  // Clear the cookie
  (await cookies()).delete("MOD_AUTH_CAS");

  (await cookies()).set("MOD_AUTH_CAS", json.data.token, {
    path: "/",
  });

  return NextResponse.json(json.data, { status: res.status });
}
