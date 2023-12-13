import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	cookies().delete("MOD_AUTH_CAS");
	cookies().delete("XSRF-TOKEN");
	cookies().delete("laravel_session");

	return NextResponse.json({ message: "Logged out" });
}
