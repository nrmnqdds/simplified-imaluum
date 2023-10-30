import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import got, { GotBodyOptions } from "got";
import { CookieJar } from "tough-cookie";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieJar = new CookieJar();

  const payload = new URLSearchParams({
    username: body.username,
    password: body.password,
    execution: body.execution,
    _eventId: body._eventId,
    geolocation: "",
  });

  const { headers: __headers } = await got(
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome",
    {
      cookieJar,
      https: { rejectUnauthorized: false },
      followRedirect: false,
    } as GotBodyOptions<string>
  );

  const { headers: _headers } = await got.post(
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome",
    {
      cookieJar,
      body: payload.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      followRedirect: false,
    } as GotBodyOptions<string>
  );

  const { headers: ___headers } = await got(_headers["location"], {
    cookieJar,
    https: { rejectUnauthorized: false },
    followRedirect: false,
  } as GotBodyOptions<string>);

  cookieJar.store.getAllCookies((err, _cookies) => {
    // console.log("cookies", cookies);
    _cookies.forEach((cookie) => {
      const cookieName = cookie.key;
      const cookieValue = cookie.value;
      if (cookieName === "MOD_AUTH_CAS") {
        cookies().set(cookieName, cookieValue);
      }
    });
  });

  return NextResponse.json("success");
}
