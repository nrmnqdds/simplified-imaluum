"use server";

import { parse } from "node-html-parser";
import got from "got";

export async function GetAds() {
  try {
    const url = "https://souq.iium.edu.my/embeded";

    const response = await got(url, {
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    const root = parse(response.body);
    const articles = root.querySelectorAll(
      'div[style*="width:100%; clear:both;height:100px"]'
    );

    const structuredData = articles.map((element) => {
      const adsImg = element.querySelector("img").getAttribute("src");
      const adsLink = element.querySelector("a").getAttribute("href");

      return {
        adsImg,
        adsLink,
      };
    });

    return {
      success: true,
      data: structuredData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
