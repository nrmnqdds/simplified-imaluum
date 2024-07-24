"use server";

import { IMALUUM_SCHEDULE_PAGE } from "@/constants";
import got from "got";
import moment from "moment";
import { cookies } from "next/headers";
import { parse } from "node-html-parser";

/**
 * A helper function to get the schedule from a single session
 * @param {string} sessionQuery
 * @param {string} sessionName
 * @returns {Promise<{sessionQuery: string, sessionName: string, schedule: Subject[]}>} An object containing the schedule for a single session
 */
const getScheduleFromSession = async (
  sessionQuery: string,
  sessionName: string
): Promise<
  | {
      sessionQuery: string;
      sessionName: string;
      schedule: Subject[];
    }
  | undefined
> => {
  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${sessionQuery}`;

  const predefinedColors = [
    "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
    "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
    "bg-fuchsia-200 text-fuchsia-700 border-fuchsia-500 hover:bg-fuchsia-300 hover:text-fuchsia-800",
    "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
    "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
    "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
    "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
    "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
    "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
    "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
    "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
  ];

  try {
    if (cookies().get("MOD_AUTH_CAS")) {
      const response = await got(url, {
        headers: {
          Cookie: cookies().toString(),
        },
        https: { rejectUnauthorized: false },
        followRedirect: false,
      });
      if (!response.body) throw new Error("Failed to go to page");

      const root = parse(response.body);
      if (!root) throw new Error("Failed to parse the body");

      const table = root.querySelector(".box-body table.table.table-hover");
      if (!table) throw new Error("No table found!");

      const rows = table.querySelectorAll("tr");
      if (!rows) throw new Error("No row available");

      const schedule: Subject[] = [];

      for (const row of rows) {
        const tds = row.querySelectorAll("td");

        if (tds.length === 0 || !tds) {
          continue;
        }

        // Check if tds array has enough elements
        if (tds.length === 9) {
          const courseCode = tds[0].textContent.trim();
          const courseName = tds[1].textContent.trim();
          const section = tds[2].textContent.trim();
          const chr = tds[3].textContent.trim();
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
          if (!days) {
            continue;
          }

          // Split the days array if it has more than one item
          const splitDays = days.length > 1 ? [...days] : days;
          if (!splitDays) {
            continue;
          }

          const timetemp = tds[6].textContent;
          if (!timetemp) {
            continue;
          }

          const time = timetemp.trim().replace(/ /gi, "").split("-");

          let start: moment.Moment | string = moment(time[0], "Hmm");
          if (!start.isValid()) {
            continue;
          }
          start = start.format("HH:mm:ssZ");
          let end: moment.Moment | string = moment(time[1], "Hmm");
          if (!end.isValid()) {
            continue;
          }
          end = end.format("HH:mm:ssZ");

          const venue = tds[7].textContent.trim();
          const lecturer = tds[8].textContent.trim();

          let color = "";

          for (const i of schedule) {
            if (i.courseCode === courseCode) {
              color = i.color;
              break;
            }
          }

          if (!color) {
            color =
              predefinedColors[
                Math.floor(Math.random() * predefinedColors.length)
              ];

            predefinedColors.splice(predefinedColors.indexOf(color), 1);
          }

          // Add each split day as a separate entry in the schedule
          for (const splitDay of splitDays) {
            if (!splitDay) {
              continue;
            }
            schedule.push({
              id: `${courseCode}-${section}-${splitDays.indexOf(splitDay)}`,
              courseCode,
              courseName,
              section,
              chr,
              timestamps: { start, end, day: splitDay },
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

          if (!days) {
            continue;
          }
          // Split the days array if it has more than one item
          const splitDays = days.length > 1 ? [...days] : days;
          if (!splitDays) {
            continue;
          }

          const timetemp = tds[1].textContent;
          if (!timetemp) {
            continue;
          }

          const time = timetemp.trim().replace(/ /gi, "").split("-");

          let start: moment.Moment | string = moment(time[0], "Hmm");
          if (!start.isValid()) {
            continue;
          }
          start = start.format("HH:mm:ssZ");
          let end: moment.Moment | string = moment(time[1], "Hmm");
          if (!end.isValid()) {
            continue;
          }
          end = end.format("HH:mm:ssZ");

          const venue = tds[2].textContent.trim();
          const lecturer = tds[3].textContent.trim();

          let color = "";

          for (const i of schedule) {
            if (i.courseCode === courseCode) {
              color = i.color;
              break;
            }
          }

          if (!color) {
            color =
              predefinedColors[
                Math.floor(Math.random() * predefinedColors.length)
              ];

            predefinedColors.splice(predefinedColors.indexOf(color), 1);
          }

          // if (!color) {
          //   color =
          //     predefinedColors[
          //       Math.floor(Math.random() * predefinedColors.length)
          //     ];

          //   for (const i of schedule) {
          //     if (i.color === color) {
          //       color =
          //         predefinedColors[
          //           Math.floor(Math.random() * predefinedColors.length)
          //         ];
          //     }
          //   }
          // }

          // Add each split day as a separate entry in the schedule
          for (const splitDay of splitDays) {
            if (!splitDay) {
              continue;
            }
            schedule.push({
              id: `${courseCode}-${section}-${splitDays.indexOf(splitDay)}`,
              courseCode,
              courseName,
              section,
              chr,
              timestamps: { start, end, day: splitDay },
              venue,
              color,
              lecturer,
            });
          }
        }
      }
      if (schedule && Array.isArray(schedule)) {
        // console.table(schedule);
        return { sessionQuery, sessionName, schedule };
      }
      // Handle the situation where schedule is either null or empty
      throw new Error("Invalid schedule");
    }
  } catch (err) {
    console.log("err", err);
    throw new Error("Failed to fetch schedule");
  }
};

/**
 * A server function to scrape the schedule from i-maaluum
 * @returns {Promise<{success: boolean, data: Courses[]}>} A promise that resolves to an object containing the success status and the data or null if theres no data
 */
export async function GetSchedule(): Promise<{
  success: boolean;
  data: Courses[];
}> {
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
      const sessionSelector = row.querySelector("a");

      if (!sessionSelector) throw new Error("No session selector found!");

      const sessionName: string = sessionSelector.textContent.trim();
      const sessionQuery: string = sessionSelector.getAttribute("href") || "#";

      return { sessionName, sessionQuery };
    });

    const results = await Promise.all(
      (sessionList as { sessionName: string; sessionQuery: string }[])
        .filter((session) => session !== undefined)
        .map(({ sessionName, sessionQuery }) =>
          getScheduleFromSession(sessionQuery, sessionName)
        )
    );

    if (!results || results.length === 0) {
      throw new Error("Invalid schedule");
    }

    const resultData = [];
    for (const result of results) {
      if (!result) {
        continue;
      }
      resultData.push({
        schedule: result.schedule,
        sessionName: result.sessionName,
        sessionQuery: result.sessionQuery,
      });
    }

    if (resultData && Array.isArray(resultData)) {
      return {
        success: true,
        data: resultData,
      };
    }

    throw new Error("No schedule found");
  } catch (err) {
    console.log("err", err);
    throw new Error("Failed to fetch schedule");
  }
}
