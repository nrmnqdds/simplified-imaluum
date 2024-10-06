import { IMALUUM_HOME_PAGE } from "@/constants";
import got from "got";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const username = params.get("username");

  if (!username) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  try {
    const response = await got(IMALUUM_HOME_PAGE, {
      headers: {
        Cookie: cookies().toString(),
      },
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    if (!response.ok) {
      // throw new Error("Failed to fetch user profile");
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 },
      );
    }

    const root = parse(response.body);

    const hiddenTextSelector = root.querySelector(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu span.hidden-xs",
    );

    if (!hiddenTextSelector) {
      // Check if the selectors were found
      // throw new Error("Selectors not found on the page.");
      return NextResponse.json(
        { error: "Selectors not found on the page." },
        { status: 500 },
      );
    }

    const imageURL = `https://smartcard.iium.edu.my/packages/card/printing/camera/uploads/original/${username.trim()}.jpeg`;
    const name =
      hiddenTextSelector.textContent?.trim().replace(/\s+/g, " ") ?? "";

    return NextResponse.json(
      {
        success: true,
        data: {
          imageURL: imageURL,
          name: name,
          matricNo: username,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    // throw new Error("Failed to fetch user profile");
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}
