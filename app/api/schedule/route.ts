import { IMALUUM_SCHEDULE_PAGE } from "@/constants";
import { getScheduleFromSession } from "@/lib/server/schedule";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET() {
  const _cookies = (await cookies()).toString();

  try {
    const response = await fetch(IMALUUM_SCHEDULE_PAGE, {
      headers: {
        Cookie: _cookies,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch schedule" },
        { status: 500 },
      );
    }

    const body = await response.text();

    const root = parse(body);

    const sessionBody = root.querySelectorAll(
      ".box.box-primary .box-header.with-border .dropdown ul.dropdown-menu li[style*='font-size:16px']",
    );

    const sessionList = sessionBody.map((element) => {
      const row = element;
      const sessionSelector = row.querySelector("a");

      if (!sessionSelector) {
        return NextResponse.json(
          { error: "No session selector found!" },
          { status: 500 },
        );
      }

      const sessionName: string = sessionSelector.textContent.trim();
      const sessionQuery: string = sessionSelector.getAttribute("href") || "#";

      return { sessionName, sessionQuery };
    });

    const results = await Promise.all(
      (sessionList as { sessionName: string; sessionQuery: string }[])
        .filter((session) => session !== undefined)
        .map(({ sessionName, sessionQuery }) =>
          getScheduleFromSession(sessionQuery, sessionName, _cookies),
        ),
    );

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "Failed to fetch schedule" },
        { status: 500 },
      );
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
      return NextResponse.json(
        {
          success: true,
          data: resultData,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: "Invalid schedule" }, { status: 500 });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 },
    );
  }
}
