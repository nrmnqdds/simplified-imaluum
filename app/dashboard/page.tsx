"use client";

import { useState, useContext } from "react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import UserID from "../../components/UserID";
import { useCookiesProvider } from "../context/cookies-provider";

const Page = () => {
  // console.log("cookies from dashboard", cookies);
  const { cookies } = useCookiesProvider();
  console.log("cookies from dashboard", cookies);

  return (
    <div className="min-w-screen min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
      <ThemeSwitcher className="absolute top-2 left-5" />
      <UserID />
      <div className="absolute top-5">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-400 text-center">
          Welcome to your dashboard
        </p>
      </div>
    </div>
  );
};

export default Page;
