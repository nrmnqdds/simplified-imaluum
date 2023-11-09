import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule`;

  const cookieStore = cookies();

  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; "); // Join the cookie strings

  const response = await fetch(url, {
    headers: {
      Cookie: cookieStrings,
    },
  });

  if (!response.ok) {
    return NextResponse.json(`Failed to fetch data from ${url}`);
  }

  const html = await response.text();

  const root = parse(html);
  // console.log("root", root);

  // Corrected selector to target the session elements
  const sessionBody = root.querySelectorAll(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  // console.log("sessionBody", sessionBody);

  let sessionList = [];

  sessionBody.forEach((element) => {
    // Removed the unnecessary parameters
    const row = element;
    const sessionName = row.querySelector("a").textContent.trim();
    const sessionQuery = row.querySelector("a").getAttribute("href");
    sessionList.push({ sessionName, sessionQuery });
  });

  return NextResponse.json({ sessionList });
}
