import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { tabletojson } from "tabletojson";

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

  sessionList.pop();
  sessionList.reverse();
  // console.log("sessionList", sessionList);

  const cgpaPromises = sessionList.map(({ sessionQuery, sessionName }) =>
    cgpaChart(sessionQuery, sessionName, cookieStrings)
  );

  const results: any[] = await Promise.all(cgpaPromises);

  // console.log("results from GET", results);
  // const gpaValues = results.map((result) => result.gpaValue);
  // const cgpaValues = results.map((result) => result.cgpaValue);

  // return NextResponse.json({ gpaValues, cgpaValues });

  return NextResponse.json(results);
}

const cgpaChart = async (
  sessionQuery: string,
  sessionName: string,
  cookieStrings: string
) => {
  try {
    const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;

    const response = await fetch(url, {
      headers: {
        Cookie: cookieStrings,
      },
    });

    const html = await response.text();
    const root = parse(html);

    const resultTable = root.querySelector("table.table.table-hover").outerHTML;

    const tableJSON = tabletojson.convert(resultTable);

    const cgpaValue = tableJSON[0][tableJSON[0].length - 1]["Credit Hour"]
      .split("\n")[2]
      .trim();
    const gpaValue = tableJSON[0][tableJSON[0].length - 1]["Subject Name"]
      .split("\n")[2]
      .trim();

    // console.log("results", { gpaValue, cgpaValue });

    return { sessionName, gpaValue, cgpaValue };
  } catch (e) {
    console.log(e);
    return { gpaValue: "N/A", cgpaValue: "N/A" };
  }
};
