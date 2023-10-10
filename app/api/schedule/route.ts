import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { session } = await request.json();

  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule${session}`;
  console.log("url", url);

  const cookieStore = cookies();
  // console.log("cookieStore", cookieStore);

  // Create a Axios instance with cookies
  const axiosInstance = axios.create({
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "), // Use only name and value properties
    },
  });

  // Send a GET request to the website
  const response: AxiosResponse = await axiosInstance.get(url);
  //   console.log("Login response status:", response.status);

  // Load the HTML content into Cheerio
  const $ = load(response.data);
  //   console.log(response.data);

  // await new Promise((r) => setTimeout(r, 200));
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

  // const hiddenTextSelector = $(
  //   ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu span.hidden-xs"
  // );
  // const hiddenText = hiddenTextSelector.text().trim().replace(/\s+/g, " "); // Trim and replace multiple whitespace with a single space;

  return NextResponse.json({ schedule });
}
