"use server";
import { IMALUUM_CAS_PAGE, IMALUUM_LOGIN_PAGE } from "@/constants";
import * as Sentry from "@sentry/nextjs";
import got from "got";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { CookieJar } from "tough-cookie";

const secret = new Date().toISOString().split("T")[0];

export async function ImaluumLogin(form: {
  username: string;
  password: string;
  rememberMe?: boolean;
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
              expires: new Date(Date.now() + 3600000),
            });

            const token = await new SignJWT({
              username: form.username,
              cookie: cookie.value,
            })
              .setProtectedHeader({ alg: "HS256" })
              .setJti(nanoid())
              .setIssuedAt()
              .setIssuer("nrmnqdds")
              .setSubject(
                JSON.stringify({
                  username: form.username,
                  password: form.password,
                })
              )
              .setExpirationTime("31d")
              .sign(new TextEncoder().encode(secret));

            cookies().set({
              name: "imaluum-session",
              value: token,
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production",
              expires: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
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
    cookies().delete("imaluum-session");

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
