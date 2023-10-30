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
      <div className="h-screen flex flex-col">
        {/* <div className="h-full grid grid-cols-2 grid-rows-2 gap-2"> */}
        {/* <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} /> */}
        <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`animate-pulse row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
                i === 3 || i === 6 ? "col-span-2" : ""
              }`}
            >
              Coming soon
            </div>
          ))}
        </div>
        {/* <CGPA className={"border-zinc-500 border rounded-2xl"} /> */}
        {/* </div> */}
        <Advertisement className={"w-full h-[20%] md:h-[35%] flex flex-col"} />
      </div>
    </div>
  );
};

export default Page;
