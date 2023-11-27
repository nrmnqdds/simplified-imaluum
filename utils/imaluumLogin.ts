"use server";
import { cookies } from "next/headers";
import got, { GotBodyOptions } from "got";
import { CookieJar } from "tough-cookie";
import {
  IMALUUM_LOGIN_PAGE,
  IMALUUM_LOGIN_PAGE_2,
  IMALUUM_HOME_PAGE,
} from "@/app/constants";

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
    } as GotBodyOptions<string>).then(async () => {
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
    });

    // macam tak penting je ni
    // .then(async () => {
    //       await got(IMALUUM_HOME_PAGE, {
    //         cookieJar,
    //         https: { rejectUnauthorized: false },
    //         followRedirect: false,
    //       } as GotBodyOptions<string>);
    //     });

    cookieJar.store.getAllCookies((err: Error, _cookies: string[]) => {
      // console.log("cookies", _cookies);
      _cookies.forEach((cookie: any) => {
        const cookieName = cookie.key;
        const cookieValue = cookie.value;
        if (
          cookieName === "MOD_AUTH_CAS" ||
          cookieName === "laravel_session" ||
          cookieName === "XSRF-TOKEN"
        ) {
          cookies().set({
            name: cookieName,
            value: cookieValue,
            // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
            secure: true,
            httpOnly: true,
          });
        }
      });
    });

    return "success";
  } catch (err) {
    console.log(err);

    return "failed";
  }
}
