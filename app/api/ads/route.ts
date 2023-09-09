import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { load } from "cheerio";
import { writeFileSync } from "fs";

export async function GET(request: Request) {
  const url = "https://souq.iium.edu.my/embeded";

  axios.get(url).then((response: AxiosResponse) => {
    const $ = load(response.data);
    const articles = $('div[style*="width:100%; clear:both;height:100px"]');

    const structuredData = [];

    articles.each((index, element) => {
      const $element = $(element);
      const adsImg = $element.find("img").attr("src");
      const adsLink = $element.find("a").attr("href");

      structuredData.push({
        adsImg,
        adsLink,
      });
    });
    // console.log("data", structuredData);
    writeFileSync("app/api/adsList.json", JSON.stringify(structuredData));

    // return NextResponse.json({ structuredData });
  });
}
