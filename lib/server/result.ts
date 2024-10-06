"use server";

import { parse } from "node-html-parser";

/**
 * A helper function to get the result from a single session
 * @param {string} sessionQuery
 * @param {string} sessionName
 * @param {string} cookie
 * @returns {Result} An object containing the result for a single session
 */
export const getResultFromSession = async (
  sessionQuery: string,
  sessionName: string,
  cookie: string,
): Promise<Result> => {
  const url = `https://imaluum.iium.edu.my/MyAcademic/result${sessionQuery}`;
  try {
    const response = await fetch(url, {
      headers: {
        Cookie: cookie,
      },
      // https: { rejectUnauthorized: false },
      // followRedirect: false,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch schedule");
    }

    const body = await response.text();

    const root = parse(body);

    const table = root.querySelector(".box-body table.table.table-hover");
    const rows = table?.querySelectorAll("tr");

    if (!rows) throw new Error("Failed to fetch schedule");

    const result = [];

    const tds = rows[rows.length - 1].querySelectorAll("td");

    if (
      tds[0].textContent.trim() ===
      "Please contact finance division regarding tuition fees"
    ) {
      for (const row of rows) {
        const tds = row.querySelectorAll("td");

        // Check if tds array has enough elements
        if (tds.length >= 4) {
          const courseCode = tds[0].textContent.trim();
          if (courseCode.split(/\s{2,}/)[0] === "Total Credit Points") {
            break;
          }
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
};
