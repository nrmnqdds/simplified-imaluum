import { IMALUUM_RESULT_PAGE } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parse } from "node-html-parser";
import { getResultFromSession } from "@/lib/server/result";

export async function GET() {
  const _cookies = (await cookies()).toString();

  try {
    const response = await fetch(IMALUUM_RESULT_PAGE, {
      headers: {
        Cookie: _cookies,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch result" },
        { status: 500 },
      );
    }

    const body = await response.text();

    const root = parse(body);
    if (!root) throw new Error("Failed to parse the page body");

    const sessionBody = root.querySelectorAll(
      ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']",
    );

    if (!sessionBody) throw new Error("Failed to fetch session body");

    const sessionList = [];

    for (const element of sessionBody) {
      const row = element;
      const sessionName = row.querySelector("a")?.textContent.trim();
      const sessionQuery = row.querySelector("a")?.getAttribute("href");
      sessionList.push({ sessionName, sessionQuery });
    }

    sessionList.reverse();
    if (sessionList.length === 0) {
      // must return null, dont throw error
      // assuming the student is 1st year 1st sem and havent taken any exams yet
      return NextResponse.json(
        {
          success: true,
          data: null,
        },
        { status: 200 },
      );
    }

    const results: Result[] = await Promise.all(
      sessionList.map(({ sessionQuery, sessionName }) =>
        getResultFromSession(
          sessionQuery as string,
          sessionName as string,
          _cookies,
        ),
      ),
    );

    return NextResponse.json(
      {
        success: true,
        data: results,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // throw new Error("Failed to fetch data");
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
