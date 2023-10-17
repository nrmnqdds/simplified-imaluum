import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function POST(request: Request) {
  const { session } = await request.json();

  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${session}`;
  // console.log("url", url);

  const cookieStore = cookies();

  // Create an array of cookie strings
  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  // Send a GET request to the website using the Fetch API
  const response = await fetch(url, {
    headers: {
      Cookie: cookieStrings.join("; "), // Use only name and value properties
    },
  });

  if (!response.ok) {
    return NextResponse.json(`Failed to fetch data from ${url}`);
  }

  // Read the response data as text
  const html = await response.text();

  // Load the HTML content into Cheerio
  const $ = load(html);

  const tableBody = $("table.table-hover tbody tr");

  const schedule = [];

  tableBody.each((index, element) => {
    const row = $(element);

    if (!row.find("td:nth-child(3)").attr("rowspan")) {
      return;
    }

    const courseCode = row.find("td:nth-child(1)").text().trim();
    const courseName = row.find("td:nth-child(2)").text().trim();
    const section = parseInt(row.find("td:nth-child(3)").text().trim());
    const chr = parseInt(row.find("td:nth-child(4)").text().trim());
    const days = row
      .find("td:nth-child(6)")
      .text()
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

    const time = row
      .find("td:nth-child(7)")
      .text()
      .trim()
      .replace(/ /gi, "")
      .split("-");

    // .map((t) => {
    //   return {
    //     startTime: t[0],
    //     endTime: t[1],
    //   };
    // });
    const venue = row.find("td:nth-child(8)").text().trim();
    const lecturer = row.find("td:nth-child(9)").text().trim();

    // Add each split day as a separate entry in the schedule
    splitDays.forEach((splitDay: any) => {
      schedule.push({
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
  });

  return NextResponse.json({ schedule });
}
