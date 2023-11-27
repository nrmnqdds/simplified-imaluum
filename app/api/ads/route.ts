import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

export const runtime = "edge";
export const preferredRegion = "ap-southeast-1";

export async function GET(request: Request) {
  try {
    const url = "https://souq.iium.edu.my/embeded";

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(`Failed to fetch data from ${url}`);
    }

    const html = await response.text();

    const root = parse(html);
    const articles = root.querySelectorAll(
      'div[style*="width:100%; clear:both;height:100px"]'
    );

    const structuredData = [];

    articles.forEach((element) => {
      const adsImg = element.querySelector("img")?.getAttribute("src") || "";
      const adsLink = element.querySelector("a")?.getAttribute("href") || "";

      structuredData.push({
        adsImg,
        adsLink,
      });
    });

    return NextResponse.json({ structuredData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}
