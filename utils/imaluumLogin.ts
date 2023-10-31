"use server";
import { cookies } from "next/headers";
import got, { GotBodyOptions } from "got";
import { CookieJar } from "tough-cookie";
import { IMALUUM_LOGIN_PAGE, IMALUUM_LOGIN_PAGE_2 } from "@/app/constants";

export async function ImaluumLogin(form: iMaluumForm) {
  const cookieJar = new CookieJar();

  const payload = new URLSearchParams({
    username: form.username,
    password: form.password,
    execution: form.execution,
    _eventId: form._eventId,
    geolocation: "",
  });

  try {
    await got(IMALUUM_LOGIN_PAGE, {
      cookieJar,
      https: { rejectUnauthorized: false },
      followRedirect: false,
    } as GotBodyOptions<string>);

    await got
      .post(IMALUUM_LOGIN_PAGE_2, {
        cookieJar,
        body: payload.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        followRedirect: false,
      } as GotBodyOptions<string>)
      .then(async (res) => {
        await got(res.headers["location"], {
          cookieJar,
          https: { rejectUnauthorized: false },
          followRedirect: false,
        } as GotBodyOptions<string>);
      });

    cookieJar.store.getAllCookies((err: Error, _cookies: string[]) => {
      // console.log("cookies", cookies);
      _cookies.forEach((cookie: any) => {
        const cookieName = cookie.key;
        const cookieValue = cookie.value;
        if (
          cookieName === "MOD_AUTH_CAS" ||
          cookieName === "laravel_session" ||
          cookieName === "XSRF_TOKEN"
        ) {
          cookies().set(cookieName, cookieValue);
        }
      });
    });

    return "success";
  } catch (err) {
    console.log(err);

    return "failed";
  }
}
