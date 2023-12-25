"use server";
import { IMALUUM_CAS_PAGE, IMALUUM_LOGIN_PAGE } from "@/constants";
import got from "got";
import { cookies } from "next/headers";
import { CookieJar } from "tough-cookie";

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

    const cookieStore = cookieJar.toJSON().cookies;

    if (cookieStore.length === 0) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    for (const cookie of cookieStore) {
      console.log(cookie);
      if (cookie.key === "MOD_AUTH_CAS") {
        console.log("Found cookie");
        cookies().set("MOD_AUTH_CAS", cookie.value);

        break;
      }
    }
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "Invalid username or password",
    };
  }
}
