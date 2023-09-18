import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  //   const { session } = await request.json();

  const url = `https://imaluum.iium.edu.my/MyAcademic/result`;
  console.log("getcgpaurl", url);

  const cookieStore = cookies();

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

  const sessionBody = $(
    ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']"
  );

  let sessionList = [];

  sessionBody.each((index, element) => {
    const row = $(element);
    const sessionName = row.find("a").text().trim();
    const sessionQuery = row.find("a").attr("href");
    sessionList.push({ sessionName, sessionQuery });
  });

  async function fetchgpa(element: any) {
    const response: AxiosResponse = await axiosInstance.get(
      url + element.sessionQuery
    );
    const $ = load(response.data);

    const gpaValue = $("td:contains('Grade Point Average(GPA)')")
      .next("td")
      .text();
    const cgpaValue = $("td:contains('Cummulative Grade Point Average (CGPA)')")
      .next("td")
      .text();

    console.log("GPA:", gpaValue);
    console.log("CGPA:", cgpaValue);
  }

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
