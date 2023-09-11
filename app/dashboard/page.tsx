"use client";

import Advertisement from "../../components/Advertisements";
import Disciplinary from "../../components/Disciplinary";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import UserID from "../../components/UserID";

const Page = () => {
  return (
    <div className="min-w-screen min-h-screen bg-slate-100 dark:bg-zinc-900 flex">
      <ThemeSwitcher className="absolute top-2 left-5" />
      <div className="w-[60%] flex flex-col p-5 justify-between gap-5">
        <h1 className="self-end font-bold text-2xl text-zinc-400">Dashboard</h1>
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
          <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
          <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
          <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
          <Disciplinary className={"bg-yellow-500 rounded-2xl"} />
        </div>

        <Advertisement className={"w-full h-[35%] flex flex-col"} />
      </div>
      <div className="w-[40%] dark:bg-zinc-950 bg-slate-50">
        <UserID />
      </div>
    </div>
  );
};

export default Page;
