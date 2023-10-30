import { NextResponse } from "next/server";
import { parse } from "node-html-parser";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  //   const { session } = await request.json();

  const url = `https://imaluum.iium.edu.my/MyAcademic/result`;
  console.log("getcgpaurl", url);

  const cookieStore = cookies();

  const cookieStrings = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // Send a GET request to the website
  const response = await fetch(url, {
    headers: {
      Cookie: cookieStrings,
    },
  });

  //   console.log("Login response status:", response.status);

  // Load the HTML content into Cheerio
  const html = await response.text();
  const root = parse(html);

  const sessionBody = root.querySelectorAll(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  let sessionList = [];

  sessionBody.forEach((element) => {
    const row = element;
    const sessionName = row.querySelector("a").textContent.trim();
    const sessionQuery = row.querySelector("a").getAttribute("href");
    sessionList.push({ sessionName, sessionQuery });
  });

  return NextResponse.json({ sessionList });

  // async function fetchgpa(element: any) {
  //   const response: AxiosResponse = await axiosInstance.get(
  //     url + element.sessionQuery
  //   );
  //   const $ = load(response.data);

  //   const gpaValue = $("td:contains('Grade Point Average(GPA)')")
  //     .next("td")
  //     .text();
  //   const cgpaValue = $("td:contains('Cummulative Grade Point Average (CGPA)')")
  //     .next("td")
  //     .text();

  //   console.log("GPA:", gpaValue);
  //   console.log("CGPA:", cgpaValue);
  // }

  //   sessionList.forEach((element) => {
  //     fetchgpa(element.sessionQuery);
  //   });

  //   // Find the GPA and CGPA values
  //   const gpaValue = $("td:contains('Grade Point Average(GPA)')")
  //     .next("td")
  //     .text();
  //   const cgpaValue = $("td:contains('Cummulative Grade Point Average (CGPA)')")
  //     .next("td")
  //     .text();

  // Now you can use gpaValue and cgpaValue as needed
  //   console.log("GPA:", gpaValue);
  //   console.log("CGPA:", cgpaValue);
}
