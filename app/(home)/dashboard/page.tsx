import Disciplinary from "@components/Disciplinary";
import Advertisement from "@components/Advertisements";
import CGPA from "@components/CGPA";

const info = [
  {
    id: 1,
    name: "Date",
  },
];

const Page = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-3 h-full">
        <div id="row1" className="w-full h-full flex flex-row gap-3">
          <div className="flex-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex-1 animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            Coming Soon
          </div>
          <div className="flex-1 animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            Coming Soon
          </div>
        </div>
        <div id="row2" className="w-full h-full flex flex-row gap-3">
          <div className="flex-[2] rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            <CGPA />
          </div>
          <div className="flex-1 animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            Coming Soon
          </div>
        </div>
        <div id="row3" className="w-full h-full flex flex-row gap-3">
          <div className="flex-1 animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            Coming Soon
          </div>
          <div className="flex-[2] animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900">
            Coming Soon
          </div>
        </div>
      </div>

      {/* {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
            i === 3 || i === 6 ? "col-span-2" : ""
          }`}
        >
          Coming soon
        </div>
      ))} */}
      <Advertisement className={"w-full h-[20%] md:h-[35%] flex flex-col"} />
    </div>
  );
};

export default Page;
