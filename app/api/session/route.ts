import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule`;

  const cookieStore = cookies();

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

  const sessionBody = $(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  let sessionList = [];

  sessionBody.each((index, element) => {
    const row = $(element);
    const sessionName = row.find("a").text().trim();
    const sessionQuery = row.find("a").attr("href");
    sessionList.push({ sessionName, sessionQuery });
  });

  return NextResponse.json({ sessionList });
}
