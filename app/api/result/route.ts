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
    getResult(sessionQuery, sessionName, cookieStrings)
  );

  const results: any[] = await Promise.all(cgpaPromises);

  return NextResponse.json(results);
}

const getResult = async (
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

    const tableJSON = tabletojson.convert(resultTable).flat();
    // console.log("tableJSON", tableJSON);

    const cgpaValue = tableJSON[tableJSON.length - 1]["Credit Hour"]
      .split("\n")[2]
      .trim();
    const gpaValue = tableJSON[tableJSON.length - 1]["Subject Name"]
      .split("\n")[2]
      .trim();
    const status = tableJSON[tableJSON.length - 1]["Subject Name"]
      .split("\n")[3]
      .trim();
    const remarks = tableJSON[tableJSON.length - 1]["Subject Name"]
      .split("\n")[4]
      .trim();

    tableJSON.pop();

    const result = [];

    tableJSON.forEach((element) => {
      const courseCode = element["Subject Code"].trim();
      const courseName = element["Subject Name"].trim();
      const courseGrade = element["Grade"].trim();
      result.push({ courseCode, courseName, courseGrade });
    });

    return { sessionName, gpaValue, cgpaValue, status, remarks, result };
  } catch (e) {
    console.log(e);
    return { gpaValue: "N/A", cgpaValue: "N/A" };
  }
};
