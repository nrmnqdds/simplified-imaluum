import { NextResponse, NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { session } = await request.json();

  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${session}`;
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

  // Read the response data as text
  const html = await response.text();
  const root = parse(html);
  // console.log("root", root.toString());

  const table = root.querySelector(".box-body table.table.table-hover");
  // console.log("table", table.toString());
  const rows = table.querySelectorAll("tr");
  // console.log("rows", rows.toString());

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
      const venue = tds[7].textContent.trim();
      const lecturer = tds[8].textContent.trim();

      // Add each split day as a separate entry in the schedule
      splitDays.forEach((splitDay: any, index: number) => {
        schedule.push({
          id: `${courseCode}-${section}-${index}`,
          courseCode,
          courseName,
          section,
          chr,
          days: splitDay,
          time,
          venue,
          lecturer,
        });
      });
    }
  });

  return NextResponse.json({ schedule });
}
