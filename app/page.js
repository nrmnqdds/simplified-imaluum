"use client";

import { useState, useEffect } from "react";
import HomeSlideShow from "../components/HomeSlideShow";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import IMLOGO from "../public/logo-landing-page.png";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/imaluumLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // const data = await response.json();
      // console.log(data);

      const { cookies } = await response.json();

      console.log("cookie: ", cookies);
    } catch {
      setLoginMessage("Login failed");
    }
  };

  return (
    <main className="max-w-screen overflow-hidden flex">
      <HomeSlideShow />
      <div className="bg-gradient-to-l from-white dark:from-zinc-900 from-5% dark:10% to-transparent h-screen flex-1"></div>
      <div className="bg-white dark:bg-zinc-900 h-screen flex-1 flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1
            className={`text-4xl text-zinc-900 dark:text-white font-bold flex items-center ${poppins.className}`}
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

          <h2 className={`text-2xl text-zinc-700 ${poppins.className}`}>
            A simplified version of i-Ma&apos;luum for students
          </h2>
        </div>

        <form
          className="flex flex-col gap-2 justify-center text-black dark:text-white"
          onSubmit={handleSubmit}
          id="login-form"
          autoComplete="on"
        >
          <input
            type="text"
            name="username"
            placeholder="Matric Number"
            className="bg-slate-200 dark:bg-zinc-800 py-3 px-6 rounded-md focus:outline-none focus:shadow-inner"
            onChange={(e) =>
              setUsername(
                (e.target.value = e.target.value
                  .toLowerCase()
                  .replace("@iium.edu.my", ""))
              )
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-slate-200 dark:bg-zinc-800 py-3 px-6 rounded-md focus:outline-none focus:shadow-inner"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-400 hover:bg-green-500 hover:scale-105 duration-75 active:translate-y-1 text-white px-4 py-2 rounded-md">
            Login
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
