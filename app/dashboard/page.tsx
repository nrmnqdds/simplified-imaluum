"use client";

import Advertisement from "../../components/Advertisements";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import UserID from "../../components/UserID";
// import { useCookiesProvider } from "../context/cookies-provider";

const Page = () => {
  // const { cookies } = useCookiesProvider();
  // console.log("cookies from dashboard", cookies);

  return (
    <div className="min-w-screen min-h-screen bg-slate-100 dark:bg-zinc-900 flex">
      <ThemeSwitcher className="absolute top-2 left-5" />

      <div className="w-[60%] flex p-5">
        <Advertisement />
      </div>
      <div className="w-[40%] dark:bg-zinc-950 bg-slate-50">
        <UserID />
      </div>
    </div>
  );
};

export default Page;
