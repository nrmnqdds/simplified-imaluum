"use server";

import { parse } from "node-html-parser";
import { cookies } from "next/headers";
import { IMALUUM_HOME_PAGE } from "@/constants";

export async function GetUserProfile(username: string) {
  try {
    const cookieStore = cookies();
    // console.log("cookieStore", cookieStore);

    const cookieStrings = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(IMALUUM_HOME_PAGE, {
      headers: {
        Cookie: cookieStrings,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch data from ${IMALUUM_HOME_PAGE}`,
      };
    }

    const html = await response.text();

    const root = parse(html);
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
    console.log(err);
  }
}
