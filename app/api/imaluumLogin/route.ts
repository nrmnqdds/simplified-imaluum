import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { IMALUUMLOGINPAGE } from "../../constants";
// import chromium from "chrome-aws-lambda";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  console.log("Launching browser");

  const browser = await puppeteer.launch({
    headless: true, // Set to true for production
    args: ["--no-sandbox"],
  });

  // const browser = await chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath,
  //   headless: chromium.headless,
  //   ignoreHTTPSErrors: true,
  // });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  try {
    console.log("Opening page");
    await page.goto(IMALUUMLOGINPAGE);

    console.log("Typing username");
    await page.type("input#username", username);
    await new Promise((r) => setTimeout(r, 500));
    console.log("Typing password");
    await page.type("input#password", password);
    await new Promise((r) => setTimeout(r, 500));
    console.log("Clicking submit");
    await page.click("input.btn");

    await page.waitForNavigation();

    console.log("Getting cookies");
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
