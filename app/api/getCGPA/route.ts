import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { tabletojson } from "tabletojson";

export const runtime = "edge";
export const preferredRegion = "sin1";

export async function GET(request: NextRequest) {
  const url = `https://imaluum.iium.edu.my/MyAcademic/result`;

  const cookieStore = cookies();

  const cookieStrings = cookieStore
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

  // console.log("sessionList", sessionList);

  const cgpaPromises = sessionList.map(({ sessionQuery }) =>
    cgpaChart(sessionQuery, cookieStrings)
  );

  const results = await Promise.all(cgpaPromises);

  console.log("results", results);
  // const gpaValues = results.map((result) => result.gpaValue);
  // const cgpaValues = results.map((result) => result.cgpaValue);

  // return NextResponse.json({ gpaValues, cgpaValues });

  return NextResponse.json({ message: "success" });
}

async function cgpaChart(sessionQuery: string, cookieStrings: string) {
  const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;

  await fetch(url, {
    headers: {
      Cookie: cookieStrings,
    },
  })
    .then((response) => response.text())
    .then((html) => parse(html))
    .then((root) => {
      const resultTable = root.querySelector(
        "table.table.table-hover"
      ).outerHTML;

      const tableJSON = tabletojson.convert(resultTable);

      try {
        const cgpaValue = tableJSON[0][tableJSON[0].length - 1]["Credit Hour"]
          .split("\n")[2]
          .trim();
        const gpaValue = tableJSON[0][tableJSON[0].length - 1]["Subject Name"]
          .split("\n")[2]
          .trim();

        // console.log("cgpaValue", cgpaValue);
        // console.log("gpaValue", gpaValue);

        return gpaValue;
      } catch (e) {
        console.log(e);
        // return { gpaValue: "N/A", cgpaValue: "N/A" };
        return "N/A";
      }
    });
}
