"use server";

import { parse } from "node-html-parser";

export async function GetAds() {
  try {
    const url = "https://souq.iium.edu.my/embeded";

    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch data from ${url}`,
      };
    }

    const html = await response.text();

    const root = parse(html);
    const articles = root.querySelectorAll(
      'div[style*="width:100%; clear:both;height:100px"]'
    );

    const structuredData = [];

    for (const element of articles) {
      const adsImg = element.querySelector("img")?.getAttribute("src") || "";
      const adsLink = element.querySelector("a")?.getAttribute("href") || "";

      structuredData.push({
        adsImg,
        adsLink,
      });
    }

    return {
      success: true,
      data: structuredData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      error: "Error fetching data",
    };
  }
}
