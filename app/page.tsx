"use client";

import { useState } from "react";
import HomeSlideShow from "@components/HomeSlideShow";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import IMLOGO from "../public/logo-landing-page.png";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { GetLoginCookies } from "./api/GetLoginCookies";
import { FaQuestion } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await GetLoginCookies(formData);
    if (response) {
      router.push("/dashboard");
    } else {
      setLoginMessage("Login failed");
    }

    setIsLoading(false);
  };

  return (
    <main className="max-w-screen overflow-hidden flex">
      <HomeSlideShow />
      <ThemeSwitcher className="absolute top-2 right-5" />
      <div className="bg-gradient-to-l from-white dark:from-zinc-900 from-5% dark:10% to-transparent h-screen flex-1 hidden md:block"></div>
      <div className="bg-white dark:bg-zinc-900 h-screen flex-1 flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1
            className={`text-xl lg:text-4xl text-zinc-900 dark:text-white font-bold flex items-center ${poppins.className}`}
          >
            Simplified{" "}
            <span>
              <Image
                src={IMLOGO}
                width={30}
                className="object-contain"
                alt=""
              />
            </span>{" "}
            i-Ma&apos;luum
          </h1>

          <h2 className={`lg:text-2xl text-zinc-700 ${poppins.className}`}>
            A simplified version of i-Ma&apos;luum for students
          </h2>
        </div>

        <form
          className="flex flex-col gap-2 justify-center text-black dark:text-white"
          onSubmit={handleSubmit}
          // action={GetLoginCookies}
          id="login-form"
          autoComplete="on"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              placeholder="Matric Number"
              className="bg-slate-200 dark:bg-zinc-800 py-3 px-6 rounded-md focus:shadow-inner focus:outline-none"
              onChange={(e) =>
                setData({
                  ...data,
                  username: (e.target.value = e.target.value
                    .toLowerCase()
                    .replace("@iium.edu.my", "")),
                })
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="absolute -right-5">
                  <FaQuestion className="text-slate-300 dark:text-zinc-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-slate-300 dark:text-zinc-600">
                    Please enter your matric number without {"@iium.edu.my"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-slate-200 dark:bg-zinc-800 py-3 px-6 rounded-md focus:outline-none focus:shadow-inner"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            className="bg-green-400 hover:bg-green-500 disabled:bg-green-900 disabled:hover:scale-100 disabled:cursor-not-allowed hover:scale-105 duration-75 active:translate-y-1 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-red-500">{loginMessage}</p>
        </form>
        <Link
          href="https://github.com/qryskalyst20/simplified-imaluum"
          target="_blank"
          className="absolute bottom-10"
        >
          <BsGithub className="text-3xl mt-4 text-zinc-900 dark:text-slate-200" />
        </Link>
      </div>
    </main>
  );
}
