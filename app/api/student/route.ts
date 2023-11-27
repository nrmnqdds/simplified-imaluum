import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_HOME_PAGE } from "../../constants";

export const runtime = "edge";
export const preferredRegion = "ap-southeast-1";

export async function GET(request: NextRequest) {
  try {
    const url = IMALUUM_HOME_PAGE;

    const cookieStore = cookies();
    // console.log("cookieStore", cookieStore);

    const cookieStrings = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(url, {
      headers: {
        Cookie: cookieStrings,
      },
    });

    if (!response.ok) {
      return NextResponse.json(`Failed to fetch data from ${url}`);
    }

    const html = await response.text();

    const root = parse(html);
    const userImageSelector = root.querySelector(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu img.user-image"
    );
    const hiddenTextSelector = root.querySelector(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu span.hidden-xs"
    );

    // Check if the selectors were found
    if (!userImageSelector || !hiddenTextSelector) {
      throw new Error("Selectors not found on the page.");
    }

    const imageURL = userImageSelector.getAttribute("src") ?? "";
    const name =
      hiddenTextSelector.textContent?.trim().replace(/\s+/g, " ") ?? "";
    console.log(name);

    // Return the text content of the selectors or do further processing as needed
    return NextResponse.json({ imageURL, name });
  } catch (error) {
    console.error("Error scraping the website:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
