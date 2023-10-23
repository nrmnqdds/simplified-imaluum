"use client";

import React, { useState } from "react";
import { ThemeSwitcher } from "@components/ThemeSwitcher";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import DARKDEMOPIC from "@/public/darkdemo.png";
import LIGHTDEMOPIC from "@/public/lightdemo.png";
import LOGO from "@/public/logo-landing-page.png";
import { useRouter } from "next/navigation";

const loadingMessageList = [
  "Checking credentials...",
  "Please wait...",
  "Grab a coffee first...",
  "Just a moment...",
];

const Hero = () => {
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

    const res = await fetch("api/auth/login2", {
      method: "GET",
    });

    const res2 = await fetch("api/auth/login2", {
      method: "POST",
      body: JSON.stringify(data),
    });
    // });
    if (res2) {
      router.replace("/dashboard");
    } else {
      setLoginMessage("Login failed");
    }

    setIsLoading(false);
  };

  return (
    <section className="relative">
      <ThemeSwitcher className="absolute top-2 right-5" />
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-zinc-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl">
          <Image
            width={48}
            height={48}
            className="object-contain"
            src={LOGO}
            alt="Your Company"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <span className="mr-2 rounded-full bg-yellow-500/10 px-3 py-2 text-sm font-semibold leading-6 text-yellow-600 dark:text-yellow-400 ring-1 ring-inset ring-indigo-500/20">
              In construction
            </span>
            <Link
              href="https://github.com/qryskalyst20/simplified-imaluum"
              target="_blank"
              className="inline-flex space-x-6"
            >
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold leading-6 text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-indigo-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-zinc-800 dark:text-slate-200">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-zinc-500"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-zinc-800 dark:text-slate-200 sm:text-6xl">
            Simplified iMa&apos;luum
          </h1>
          <p className="mt-3 text-lg leading-8 text-zinc-800 dark:text-slate-200">
            A simplified version of i-Ma&apos;luum for students. An attempt to
            make i-Ma&apos;luum more user-friendly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-center gap-y-6"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
                >
                  Username
                </label>
                <div className="mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Matric Number"
                      onChange={(e) =>
                        setData({
                          ...data,
                          username: (e.target.value = e.target.value
                            .toLowerCase()
                            .replace("@iium.edu.my", "")),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
                >
                  Password
                </label>
                <div className="mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="password"
                      name="pasword"
                      id="password"
                      autoComplete="password"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="****"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-3 items-center justify-between w-full">
              <button
                disabled={isLoading}
                className={`rounded-md ${
                  isLoading
                    ? "bg-cyan-900 cursor-not-allowed hover:bg-cyan-900 dark:hover:bg-cyan-900"
                    : "dark:bg-cyan-500 bg-cyan-600"
                } px-6 py-2.5 text-sm font-semibold text-slate-200 shadow-sm hover:bg-cyan-700 dark:hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 dark:focus-visible:outline-cyan-300`}
              >
                {isLoading ? "Loading..." : "Log In"}
              </button>
              <p className="text-red-500">{loginMessage}</p>
              <Link
                href="#feature"
                className="text-sm font-semibold leading-6 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector("#feature");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src={LIGHTDEMOPIC}
              alt="App screenshot"
              width={1232}
              height={242}
              className="rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 dark:hidden block"
            />
            <Image
              src={DARKDEMOPIC}
              alt="App screenshot"
              width={1232}
              height={242}
              className="rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
