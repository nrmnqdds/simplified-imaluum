import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	if (!cookies().has("MOD_AUTH_CAS")) {
		return NextResponse.json({ message: "no cookie" });
	}

	return NextResponse.json({ message: "yes cookie" });
}
