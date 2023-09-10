import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";
import { IMALUUM_HOME_PAGE } from "../../constants";

export async function GET(request: Request) {
  try {
    // Define the URL you want to scrape
    const url = IMALUUM_HOME_PAGE;

    const cookieStore = cookies();
    // console.log("cookieStore", cookieStore);

    // Create a Axios instance with cookies
    const axiosInstance = axios.create({
      headers: {
        Cookie: cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; "), // Use only name and value properties
      },
    });

    // Send a GET request to the website
    const response: AxiosResponse = await axiosInstance.get(url);
    console.log("Login response status:", response.status);

    // Load the HTML content into Cheerio
    const $ = load(response.data);
    // console.log(response.data);

    // Extract the selectors
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

    // You can now use userImageSelector and hiddenTextSelector for further processing
    // For example, to get the text content of the selectors:
    const userImageText = userImageSelector.attr("src");
    const hiddenText = hiddenTextSelector.text().trim().replace(/\s+/g, " "); // Trim and replace multiple whitespace with a single space;
    console.log(hiddenText);

    // Return the text content of the selectors or do further processing as needed
    return NextResponse.json({ userImageText, hiddenText });
  } catch (error) {
    console.error("Error scraping the website:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
