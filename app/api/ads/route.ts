import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET() {
  try {
    const url = "https://souq.iium.edu.my/embeded";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const body = await response.text();

    const root = parse(body);
    const articles = root.querySelectorAll(
      'div[style*="width:100%; clear:both;height:100px"]',
    );

    // const structuredData = articles.map((element) => {
    //   const adsImg = element.querySelector("img").getAttribute("src");
    //   const adsLink = element.querySelector("a").getAttribute("href");

    //   return {
    //     adsImg,
    //     adsLink,
    //   };
    // });

    const structuredData: { adsImg: string; adsLink: string }[] = [];

    for (const element of articles) {
      const adsImg = element.querySelector("img")?.getAttribute("src");
      if (!adsImg) continue;

      const adsLink = element.querySelector("a")?.getAttribute("href");
      if (!adsLink) continue;

      structuredData.push({
        adsImg,
        adsLink,
      });
    }

    return NextResponse.json({
      success: true,
      data: structuredData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // throw new Error("Failed to fetch data");
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
