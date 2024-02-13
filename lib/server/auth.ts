"use server";
import { IMALUUM_CAS_PAGE, IMALUUM_LOGIN_PAGE } from "@/constants";
import * as Sentry from "@sentry/nextjs";
import got from "got";
import { cookies } from "next/headers";
import { CookieJar } from "tough-cookie";

export async function ImaluumLogin(form: {
  username: string;
  password: string;
}) {
  return await Sentry.withServerActionInstrumentation(
    "imaluum-login",
    {
      recordResponse: true,
    },
    async () => {
      const cookieJar = new CookieJar();

      const payload = new URLSearchParams({
        username: form.username,
        password: form.password,
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

        const cookieStore = cookieJar.toJSON().cookies;

        if (cookieStore.length === 0) {
          return {
            success: false,
            message: "Invalid username or password",
          };
        }

        for (const cookie of cookieStore) {
          // console.log(cookie);
          if (cookie.key === "MOD_AUTH_CAS") {
            cookies().set({
              name: "MOD_AUTH_CAS",
              value: cookie.value,
            });
            break;
          }
        }

        console.log("Logged in successfully", form.username, form.password);
        return {
          success: true,
          matricNo: form.username,
        };
      } catch (err) {
        console.log(err);
        throw new Error("Error logging in");
      }
    }
  );
}

export async function ImaluumLogout() {
  try {
    cookies().delete("MOD_AUTH_CAS");
    cookies().delete("XSRF-TOKEN");
    cookies().delete("laravel_session");

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Error logging out",
    };
  }
}
