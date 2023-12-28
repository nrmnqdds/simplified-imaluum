"use server";

import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_HOME_PAGE } from "@/constants";
import got from "got";

const cookieStore = cookies();

const cookieStrings = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");

export async function GetUserProfile(username: string) {
  try {
    const response = await got(IMALUUM_HOME_PAGE, {
      headers: {
        Cookie: cookieStrings,
      },
      https: { rejectUnauthorized: false },
      followRedirect: false,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const root = parse(response.body);
    const hiddenTextSelector = root.querySelector(
      ".navbar-custom-menu ul.nav.navbar-nav li.dropdown.user.user-menu span.hidden-xs"
    );

    if (!hiddenTextSelector) {
      // Check if the selectors were found
      throw new Error("Selectors not found on the page.");
    }

    const imageURL = `https://smartcard.iium.edu.my/packages/card/printing/camera/uploads/original/${username}.jpeg`;
    const name =
      hiddenTextSelector.textContent?.trim().replace(/\s+/g, " ") ?? "";

    return {
      success: true,
      data: {
        imageURL: imageURL,
        name: name,
        matricNo: username,
      },
    };
  } catch (err) {
    throw new Error("Failed to fetch user profile");
  }
}
