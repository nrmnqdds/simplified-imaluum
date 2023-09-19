"use client";

import { ThemeSwitcher } from "@components/ThemeSwitcher";
import UserID from "@components/UserID";
import HomePanel from "@components/panels/HomePanel";
import SchedulePanel from "@components/panels/SchedulePanel";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { BsGithub, BsFillArrowUpCircleFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [show, handleShow] = useState<Boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tabs
      defaultValue="Home"
      className="min-w-screen min-h-screen bg-slate-100 dark:bg-zinc-900 flex flex-col px-5"
    >
      {show && (
        <div
          className="fixed bottom-10 right-10 z-20 text-zinc-900 dark:text-slate-100 cursor-pointer opacity-30 hover:opacity-80"
          onClick={scrollUp}
        >
          <BsFillArrowUpCircleFill size={50} />
        </div>
      )}
      <header className="flex justify-between items-center py-2 border-b border-zinc-500">
        <ThemeSwitcher />

        <TabsList>
          <TabsTrigger value="Schedule">Schedule</TabsTrigger>
          <TabsTrigger value="Coming Soon">Coming Soon</TabsTrigger>
        </TabsList>

        <UserID />
      </header>

      <TabsContent value="Schedule">
        <SchedulePanel />
      </TabsContent>
      <TabsContent value="Coming Soon">
        <HomePanel />
      </TabsContent>

      <footer className="h-fit py-5 mt-5 flex items-center justify-between border-t border-zinc-500 bg-slate-100 dark:bg-zinc-900">
        <div className="flex gap-5">
          <Image
            src="/logo-landing-page.png"
            alt=""
            width={50}
            height={50}
            className="object-contain"
          />
          <div>
            <h1 className="font-bold lg:text-2xl text-zinc-900 dark:text-slate-100">
              Simplified i-Ma&apos;luum
            </h1>
            <p className="text-xs lg:text-sm text-zinc-600 dark:text-zinc-400">
              A simplified version of i-Ma&apos;luum for students
            </p>
          </div>
        </div>

        <Link
          href="https://github.com/qryskalyst20/simplified-imaluum"
          target="_blank"
          className="flex flex-col gap-2 items-center"
        >
          <BsGithub className="text-3xl text-zinc-900 dark:text-slate-200" />
        </Link>
      </footer>
    </Tabs>
  );
};

export default Page;
