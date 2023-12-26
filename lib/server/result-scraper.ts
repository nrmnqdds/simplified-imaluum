"use server";

import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_RESULT_PAGE } from "@/constants";
import { tabletojson } from "tabletojson";

const getResult = async (
  sessionQuery: string,
  sessionName: string,
  cookieStrings: string
): Promise<Result> => {
  try {
    const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;

    const response = await fetch(url, {
      headers: {
        Cookie: cookieStrings,
      },
    });

    const html = await response.text();
    const root = parse(html);

    const resultTable = root.querySelector(
      "table.table.table-hover"
    )?.outerHTML;

    const tableJSON = tabletojson.convert(resultTable as string).flat();
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

    const result = tableJSON.map((element: any) => {
      const courseCode = element["Subject Code"].trim();
      const courseName = element["Subject Name"].trim();
      const courseGrade = element.Grade.trim();
      return { courseCode, courseName, courseGrade };
    });

    return { sessionName, gpaValue, cgpaValue, status, remarks, result };
  } catch (e) {
    console.log(e);
    return {
      sessionName: "N/A",
      gpaValue: "N/A",
      cgpaValue: "N/A",
      status: "N/A",
      remarks: "N/A",
      result: [{ courseCode: "N/A", courseName: "N/A", courseGrade: "N/A" }],
    };
  }
};

export async function GetResult() {
  const url = IMALUUM_RESULT_PAGE;

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

  if (!response.ok) {
    return {
      success: false,
      error: `Failed to fetch data from ${url}`,
    };
  }

  const html = await response.text();
  const root = parse(html);

  const sessionBody = root.querySelectorAll(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  const sessionList = [];

  for (const element of sessionBody) {
    const row = element;
    const sessionName = row.querySelector("a")?.textContent.trim();
    const sessionQuery = row.querySelector("a")?.getAttribute("href");
    sessionList.push({ sessionName, sessionQuery });
  }

  sessionList.pop();
  sessionList.reverse();
  if (sessionList.length === 0)
    // console.log("sessionList", sessionList);

    return {
      success: true,
      data: {
        sessionName: "N/A",
        gpaValue: "N/A",
        cgpaValue: "N/A",
        status: "N/A",
        remarks: "N/A",
        result: [{ courseCode: "N/A", courseName: "N/A", courseGrade: "N/A" }],
      },
    };

  const cgpaPromises = sessionList.map(({ sessionQuery, sessionName }) =>
    getResult(sessionQuery as string, sessionName as string, cookieStrings)
  );

  const results: Result[] = await Promise.all(cgpaPromises);

  // console.log("results: ", results);
  return {
    success: true,
    data: results,
  };
}
