"use client";

import { useState, useEffect } from "react";
import HomeSlideShow from "@/components/HomeSlidehow";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import IMLOGO from "@/public/logo-landing-page.png";
import { Poppins } from "next/font/google";
import imaluumLogin from "@/api/imaluumLogin";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    imaluumLogin({ username, password });
  };

  return (
    <main className="max-w-screen overflow-hidden flex">
      <HomeSlideShow />
      <div className="bg-gradient-to-l from-white from-5% to-transparent h-screen flex-1"></div>
      <div className="bg-white h-screen flex-1 flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1
            className={`text-4xl text-zinc-900 font-bold flex items-center ${poppins.className}`}
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

          <h2 className={`text-2xl  text-zinc-700 ${poppins.className}`}>
            A simplified version of i-Ma&apos;luum for students
          </h2>
        </div>

        <form
          className="flex flex-col gap-2 justify-center text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Matric Number"
            className="bg-slate-200 py-3 px-6 rounded-md focus:outline-none focus:shadow-inner"
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
            placeholder="Password"
            className="bg-slate-200 py-3 px-6 rounded-md focus:outline-none focus:shadow-inner"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-400 hover:bg-green-500 hover:scale-105 duration-75 active:translate-y-1 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>
        <Link
          href="https://github.com/qryskalyst20/simplified-imaluum"
          target="_blank"
          className="absolute bottom-10"
        >
          <BsGithub className="text-3xl mt-4 text-zinc-900" />
        </Link>
      </div>
    </main>
  );
}
