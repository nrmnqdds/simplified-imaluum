import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = `https://imaluum.iium.edu.my/MyAcademic/schedule`;

  const cookieStore = cookies();
  //   console.log("cookieStore", cookieStore);

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

  return NextResponse.json({ sessionList });
}
