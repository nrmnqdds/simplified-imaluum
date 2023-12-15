"use client";

import Advertisement from "@/components/Advertisements";
import CGPA from "@/components/CGPA";
import ImaluumClient from "@/utils/imaluumClient";
import { Fragment } from "react";

const Page = () => {
  const { results } = ImaluumClient() || {};

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[192px] grid-cols-3 gap-2">
        {!results ? (
          <Fragment>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 animate-pulse ${
                  i === 3 || i === 6 ? "col-span-2" : ""
                }`}
              />
            ))}
          </Fragment>
        ) : (
          <Fragment>
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
              <CGPA context={results} />
              {/* Coming Soon */}
            </div>
            <div className="flex flex-col gap-2 row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 overflow-y-scroll scrollbar-hide">
              {results?.map((result, index) => {
                return (
                  <div key={index} className="flex flex-col text-xs md:text-sm">
                    <p>
                      <span className="font-bold text-zinc-900 dark:text-slate-100">
                        Session:{" "}
                      </span>
                      {result.sessionName}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-900 dark:text-slate-100">
                        GPA:{" "}
                      </span>
                      {result.gpaValue}
                    </p>
                    <p>
                      <span className="font-bold text-zinc-900 dark:text-slate-100">
                        CGPA:{" "}
                      </span>
                      {result.cgpaValue}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
              Coming Soon
            </div>
            <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 col-span-2">
              Coming Soon
            </div>
          </Fragment>
        )}
      </div>

      <Advertisement className={"w-full h-fit flex flex-col"} />
    </div>
  );
};

export default Page;
