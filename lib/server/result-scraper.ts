"use server";

import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_RESULT_PAGE } from "@/constants";
import got from "got";
import { tabletojson } from "tabletojson";

const cookieStore = cookies();

const cookieStrings = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");

const getResult = async (
  sessionQuery: string,
  sessionName: string
): Promise<Result> => {
  const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;

  try {
    const response = await got(url, {
      headers: {
        Cookie: cookieStrings,
      },
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    const root = parse(response.body);

    const resultTable = root.querySelector("table.table.table-hover").outerHTML;

    const tableJSON = tabletojson.convert(resultTable as string).flat();

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
    throw new Error("Failed to fetch result");
  }
};

/**
 * A server function to scrape the exam result from i-maaluum
 * @returns {Promise<{success: boolean, data: Result[]}>} A promise that resolves to an object containing the success status and the data or null if theres no data
 */
export async function GetResult(): Promise<{
  success: boolean;
  data: Result[];
}> {
  try {
    const response = await got(IMALUUM_RESULT_PAGE, {
      headers: {
        Cookie: cookieStrings,
      },
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    const root = parse(response.body);

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
    if (sessionList.length === 0) {
      // must return null, dont throw error
      // assuming the student is 1st year 1st sem and havent taken any exams yet
      return {
        success: true,
        data: null,
      };
    }

    const results: Result[] = await Promise.all(
      sessionList.map(({ sessionQuery, sessionName }) =>
        getResult(sessionQuery as string, sessionName as string)
      )
    );

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
