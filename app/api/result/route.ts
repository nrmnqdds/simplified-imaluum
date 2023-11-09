import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "node-html-parser";
import { tabletojson } from "tabletojson";

export async function GET(request: NextRequest) {
  const url = "https://imaluum.iium.edu.my/MyAcademic/result";

  const cookieStrings = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(url, {
    headers: {
      Cookie: cookieStrings,
    },
  });

  const html = await response.text();
  const root = parse(html);

  const sessionBody = root.querySelectorAll(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  let sessionList = [];

  sessionBody.forEach((element) => {
    const row = element;
    const sessionName = row.querySelector("a").textContent.trim();
    const sessionQuery = row.querySelector("a").getAttribute("href");
    sessionList.push({ sessionName, sessionQuery });
  });

  sessionList.pop();
  sessionList.reverse();

  console.log("sessionList", sessionList);

  return NextResponse.json({});
}
