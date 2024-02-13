"use server";

import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_SCHEDULE_PAGE } from "@/constants";
import got from "got";
import moment from "moment";
import * as Sentry from "@sentry/nextjs";

/**
 * A helper function to get the schedule from a single session
 * @param {string} sessionQuery
 * @param {string} sessionName
 * @returns {Promise<{sessionQuery: string, sessionName: string, schedule: Subject[]}>} An object containing the schedule for a single session
 */
const getScheduleFromSession = async (
  sessionQuery: string,
  sessionName: string
): Promise<{
  sessionQuery: string;
  sessionName: string;
  schedule: Subject[];
}> => {
  return await Sentry.withServerActionInstrumentation(
    "get-schedule-from-session",
    {
      recordResponse: true,
    },
    async () => {
      const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${sessionQuery}`;

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

        const schedule = [];

        for (const row of rows) {
          const tds = row.querySelectorAll("td");

          if (tds.length === 0) continue;

          // Check if tds array has enough elements
          if (tds.length === 9) {
            const courseCode = tds[0].textContent.trim();
            const courseName = tds[1].textContent.trim();
            const section = parseInt(tds[2].textContent.trim(), 10);
            const chr = parseInt(tds[3].textContent.trim(), 10);
            const days = tds[5].textContent
              .trim()
              .replace(/ /gi, "")
              .split("-")
              .map((x) => {
                if (x.includes("SUN")) return 0;
                if (x === "M" || x.includes("MON")) return 1;
                if (x === "T" || x.includes("TUE")) return 2;
                if (x === "W" || x.includes("WED")) return 3;
                if (x === "TH" || x.includes("THUR")) return 4;
                if (x === "F" || x.includes("FRI")) return 5;
                if (x.includes("SAT")) return 6;
              });

            // Split the days array if it has more than one item
            const splitDays = days.length > 1 ? [...days] : days;
            const timetemp = tds[6].textContent;
            if (timetemp === "" || !timetemp) continue;
            const time = timetemp.trim().replace(/ /gi, "").split("-");
            const start = moment(time[0], "Hmm").format("HH:mm:ssZ");
            const end = moment(time[1], "Hmm").format("HH:mm:ssZ");
            const venue = tds[7].textContent.trim();
            const lecturer = tds[8].textContent.trim();

            const color = "";

            // Add each split day as a separate entry in the schedule
            for (const splitDay of splitDays) {
              schedule.push({
                id: `${courseCode}-${section}-${splitDays.indexOf(splitDay)}`,
                courseCode,
                courseName,
                section,
                chr,
                timestamps: [{ start, end, day: splitDay }],
                venue,
                color,
                lecturer,
              });
            }
          }

          if (tds.length === 4) {
            const courseCode = schedule[schedule.length - 1].courseCode;
            const courseName = schedule[schedule.length - 1].courseName;
            const section = schedule[schedule.length - 1].section;
            const chr = schedule[schedule.length - 1].chr;

            const days = tds[0].textContent
              .trim()
              .replace(/ /gi, "")
              .split("-")
              .map((x) => {
                if (x.includes("SUN")) return 0;
                if (x === "M" || x.includes("MON")) return 1;
                if (x === "T" || x.includes("TUE")) return 2;
                if (x === "W" || x.includes("WED")) return 3;
                if (x === "TH" || x.includes("THUR")) return 4;
                if (x === "F" || x.includes("FRI")) return 5;
                if (x.includes("SAT")) return 6;
              });
            // Split the days array if it has more than one item
            const splitDays = days.length > 1 ? [...days] : days;
            const timetemp = tds[1].textContent;
            if (timetemp === "" || !timetemp) continue;
            const time = timetemp.trim().replace(/ /gi, "").split("-");
            const start = moment(time[0], "Hmm").format("HH:mm:ssZ");
            const end = moment(time[1], "Hmm").format("HH:mm:ssZ");
            const venue = tds[2].textContent.trim();
            const lecturer = tds[3].textContent.trim();

            const color = "";

            // Add each split day as a separate entry in the schedule
            for (const splitDay of splitDays) {
              schedule.push({
                id: `${courseCode}-${section}-${splitDays.indexOf(splitDay)}`,
                courseCode,
                courseName,
                section,
                chr,
                timestamps: [{ start, end, day: splitDay }],
                venue,
                color,
                lecturer,
              });
            }
          }
        }

        return { sessionQuery, sessionName, schedule };
      } catch (err) {
        console.log("err", err);
        throw new Error("Failed to fetch schedule");
      }
    }
  );
};

/**
 * A server function to scrape the schedule from i-maaluum
 * @returns {Promise<{success: boolean, data: Courses[]}>} A promise that resolves to an object containing the success status and the data or null if theres no data
 */
export async function GetSchedule(): Promise<{
  success: boolean;
  data: Courses[];
}> {
  return await Sentry.withServerActionInstrumentation(
    "schedule-scraper",
    {
      recordResponse: true,
    },
    async () => {
      try {
        const response = await got(IMALUUM_SCHEDULE_PAGE, {
          headers: {
            Cookie: cookies().toString(),
          },
          https: { rejectUnauthorized: false },
          followRedirect: false,
        });

        const root = parse(response.body);

        const sessionBody = root.querySelectorAll(
          ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
        );

        const sessionList = sessionBody.map((element) => {
          const row = element;
          const sessionName = row.querySelector("a").textContent.trim();
          const sessionQuery = row.querySelector("a").getAttribute("href");
          return { sessionName, sessionQuery };
        });

        const results = await Promise.all(
          sessionList.map(({ sessionQuery, sessionName }) =>
            getScheduleFromSession(
              sessionQuery as string,
              sessionName as string
            )
          )
        );

        const resultData = results.map((result) => ({
          schedule: result.schedule,
          sessionName: result.sessionName,
          sessionQuery: result.sessionQuery,
        }));

        return {
          success: true,
          data: resultData,
        };
      } catch (err) {
        console.log("err", err);
        throw new Error("Failed to fetch schedule");
      }
    }
  );
}
