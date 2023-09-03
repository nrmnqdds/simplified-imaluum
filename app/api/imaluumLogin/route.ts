import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { IMALUUMLOGINPAGE } from "../../constants";
// import Chromium from "chrome-aws-lambda";
// import { chromium } from "playwright";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  console.log("Launching browser");

  // const browser = await puppeteer.launch({
  //   headless: true, // Set to true for production
  //   args: ["--no-sandbox"],
  // });

  // const browser = await chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath,
  //   headless: chromium.headless,
  //   ignoreHTTPSErrors: true,
  // });

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=7a2f92d0-ef85-42e1-b577-c8750cedfc80`,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  try {
    console.log("Opening page");
    await page.goto(IMALUUMLOGINPAGE);

    console.log("Typing username");
    await page.locator("input#username").fill(username);
    await new Promise((r) => setTimeout(r, 500));
    console.log("Typing password");
    await page.locator("input#password").fill(password);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Clicking submit");
    await page.waitForSelector("input.btn");
    await new Promise((r) => setTimeout(r, 300));
    await page.locator("input.btn").click();

    console.log("Waiting for page to load");
    await page.waitForNavigation({ waitUntil: "load" });

    console.log("Getting cookies");
    await new Promise((r) => setTimeout(r, 500));
    const cookies = await page.cookies();
    console.log("done");

    return NextResponse.json({ cookies });
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
    return NextResponse.error();
  } finally {
    await browser.close(); // Close the browser when done
  }
}
