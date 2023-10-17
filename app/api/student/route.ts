import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";
import { IMALUUM_HOME_PAGE } from "../../constants";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const url = IMALUUM_HOME_PAGE;

    const cookieStore = cookies();
    // console.log("cookieStore", cookieStore);

    const cookieStrings = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`);

    const response = await fetch(url, {
      headers: {
        Cookie: cookieStrings.join("; "), // Use only name and value properties
      },
    });

    if (!response.ok) {
      return NextResponse.json(`Failed to fetch data from ${url}`);
    }

    const html = await response.text();

    const $ = load(html);
    const userImageSelector = $(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu img.user-image"
    );
    const hiddenTextSelector = $(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu span.hidden-xs"
    );

    // Check if the selectors were found
    if (userImageSelector.length === 0 || hiddenTextSelector.length === 0) {
      throw new Error("Selectors not found on the page.");
    }

    const imageURL = userImageSelector.attr("src");
    const name = hiddenTextSelector.text().trim().replace(/\s+/g, " "); // Trim and replace multiple whitespace with a single space;
    console.log(name);

    // Return the text content of the selectors or do further processing as needed
    return NextResponse.json({ imageURL, name });
  } catch (error) {
    console.error("Error scraping the website:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
