"use client";

import Disciplinary from "@/components/Disciplinary";
import Advertisement from "@/components/Advertisements";
import CGPA from "@/components/CGPA";
import { ImaluumContext } from "@/app/context/ImaluumProvider";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  // const [data, setData] = useState<ImaluumData>();
  // const context = useContext(ImaluumContext);

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[192px] grid-cols-3 gap-2">
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 col-span-2">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 col-span-2">
          Coming Soon
        </div>
      </div>
      <Advertisement className={"w-full h-fit flex flex-col"} />
    </div>
  );
};

export default Page;
