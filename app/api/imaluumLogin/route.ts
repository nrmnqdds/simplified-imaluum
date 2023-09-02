import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const browser = await puppeteer.launch({
    headless: true, // Set to true for production
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await page.goto(
      "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome"
    );

    await page.type("input#username", username);
    await new Promise((r) => setTimeout(r, 500));
    await page.type("input#password", password);
    await new Promise((r) => setTimeout(r, 500));
    await page.click("input.btn");

    await page.waitForNavigation();

    const cookies = await page.cookies();

    return NextResponse.json({ cookies });
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
    return NextResponse.error();
  } finally {
    await browser.close(); // Close the browser when done
  }
}
