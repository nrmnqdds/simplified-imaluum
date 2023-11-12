import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import moment from "moment";

export async function GET(request: NextRequest) {
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

  const schedulePromises = sessionList.map(({ sessionQuery, sessionName }) =>
    getSchedule(sessionQuery, sessionName)
  );

  const results = await Promise.all(schedulePromises);

  //   if (results) {
  //     console.log("results", results);
  //   }

  return NextResponse.json(results);
}

const getSchedule = async (sessionQuery: string, sessionName: string) => {
  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${sessionQuery}`;
  // console.log("url", url);

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
    return NextResponse.json(`Failed to fetch data from ${url}`);
  }

  const html = await response.text();
  const root = parse(html);

  const table = root.querySelector(".box-body table.table.table-hover");
  const rows = table?.querySelectorAll("tr");

  const schedule = [];

  rows.forEach((row) => {
    const tds = row.querySelectorAll("td");

    // Check if tds array has enough elements
    if (tds.length >= 9) {
      const courseCode = tds[0].textContent.trim();
      const courseName = tds[1].textContent.trim();
      const section = parseInt(tds[2].textContent.trim(), 10);
      const chr = parseInt(tds[3].textContent.trim(), 10);
      const days = tds[5].textContent
        .trim()
        .replace(/ /gi, "")
        .split("-")
        .map((x, d) => {
          if (x == "M" || x == "MON") return (d = 1);
          else if (x == "T" || x == "TUE") return (d = 2);
          else if (x == "W" || x == "WED") return (d = 3);
          else if (x == "TH" || x == "THUR") return (d = 4);
          else if (x == "F" || x == "FRI") return (d = 5);
        });

      // Split the days array if it has more than one item
      const splitDays = days.length > 1 ? [...days] : days;

      const time = tds[6].textContent.trim().replace(/ /gi, "").split("-");
      const start = moment(time[0], "Hmm").format("HH:mm:ssZ");
      const end = moment(time[1], "Hmm").format("HH:mm:ssZ");
      // const timestamps = [{ start, end, day: days[0] }]

      const venue = tds[7].textContent.trim();
      const lecturer = tds[8].textContent.trim();

      const color = "";

      // Add each split day as a separate entry in the schedule
      splitDays.forEach((splitDay: any, index: number) => {
        schedule.push({
          id: `${courseCode}-${section}-${index}`,
          courseCode,
          courseName,
          section,
          chr,
          timestamps: [{ start, end, day: splitDay }],
          venue,
          color,
          lecturer,
        });
      });
    }
  });

  return { sessionQuery, sessionName, schedule };
};
