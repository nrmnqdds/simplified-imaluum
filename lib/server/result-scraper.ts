"use server";

import { IMALUUM_RESULT_PAGE } from "@/constants";
import * as Sentry from "@sentry/nextjs";
import got from "got";
import { cookies } from "next/headers";
import { parse } from "node-html-parser";

/**
 * A helper function to get the result from a single session
 * @param {string} sessionQuery
 * @param {string} sessionName
 * @returns {Result} An object containing the result for a single session
 */
const getResultFromSession = async (
  sessionQuery: string,
  sessionName: string
): Promise<Result> => {
  return await Sentry.withServerActionInstrumentation(
    "get-result-from-session",
    {
      recordResponse: true,
    },
    async () => {
      const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;
      try {
        const response = await got(url, {
          headers: {
            Cookie: cookies().toString(),
          },
          https: { rejectUnauthorized: false },
          followRedirect: false,
        });

        const root = parse(response.body);

        const table = root.querySelector(".box-body table.table.table-hover");
        const rows = table?.querySelectorAll("tr");

        if (!rows) throw new Error("Failed to fetch schedule");

        const result = [];

        const tds = rows[rows.length - 1].querySelectorAll("td");
        console.log("tds: ", tds[0].textContent);
        if (
          tds[0].textContent.trim() ===
          "Please contact finance division regarding tuition fees"
        ) {
          for (const row of rows) {
            const tds = row.querySelectorAll("td");

            // Check if tds array has enough elements
            if (tds.length >= 4) {
              const courseCode = tds[0].textContent.trim();
              const courseName = tds[1].textContent.trim();
              const courseGrade = tds[2].textContent.trim() || "N/A";
              const courseCredit = tds[3].textContent.trim();
              result.push({
                courseCode,
                courseName,
                courseGrade,
                courseCredit,
              });
            }
          }
          return {
            sessionQuery,
            sessionName,
            result,
            gpaValue: "N/A",
            cgpaValue: "N/A",
            status: "N/A",
            remarks: "Please contact finance division regarding tuition fees",
          };
        }

        const neutralized1 = tds[1].textContent.trim().split(/\s{2,}/) || [];
        const gpaValue = neutralized1[2];
        const status = neutralized1[3];
        const remarks = neutralized1[4];

        const neutralized2 = tds[3].textContent.trim().split(/\s{2,}/) || [];
        const cgpaValue = neutralized2[2];

        // Remove the last row
        rows.pop();

        for (const row of rows) {
          const tds = row.querySelectorAll("td");

          // Check if tds array has enough elements
          if (tds.length >= 4) {
            const courseCode = tds[0].textContent.trim();
            const courseName = tds[1].textContent.trim();
            const courseGrade = tds[2].textContent.trim() || "N/A";
            const courseCredit = tds[3].textContent.trim();
            result.push({ courseCode, courseName, courseGrade, courseCredit });
          }
        }

        return {
          sessionQuery,
          sessionName,
          result,
          gpaValue,
          cgpaValue,
          status,
          remarks,
        };
      } catch (err) {
        console.log("err", err);
        throw new Error("Failed to fetch schedule");
      }
    }
  );
};

/**
 * A server function to scrape the exam result from i-maaluum
 * @returns {Promise<{success: boolean, data: Result[]}>} A promise that resolves to an object containing the success status and the data or null if theres no data
 */
export async function GetResult(): Promise<{
  success: boolean;
  data: Result[] | null;
}> {
  return await Sentry.withServerActionInstrumentation(
    "result-scraper",
    {
      recordResponse: true,
    },
    async () => {
      try {
        const response = await got(IMALUUM_RESULT_PAGE, {
          headers: {
            Cookie: cookies().toString(),
          },
          https: { rejectUnauthorized: false },
          followRedirect: false,
        });

        const root = parse(response.body);
        if (!root) throw new Error("Failed to parse the page body");

        const sessionBody = root.querySelectorAll(
          ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
        );

        if (!sessionBody) throw new Error("Failed to fetch session body");

        const sessionList = [];

        for (const element of sessionBody) {
          const row = element;
          const sessionName = row.querySelector("a")?.textContent.trim();
          const sessionQuery = row.querySelector("a")?.getAttribute("href");
          sessionList.push({ sessionName, sessionQuery });
        }

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
            getResultFromSession(sessionQuery as string, sessionName as string)
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
  );
}
