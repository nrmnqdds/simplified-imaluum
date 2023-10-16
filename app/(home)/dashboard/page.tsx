import Disciplinary from "@components/Disciplinary";
import Advertisement from "@components/Advertisements";
import CGPA from "@components/CGPA";

const Page = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="h-screen flex flex-col justify-between">
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <CGPA className={"border-zinc-500 border rounded-2xl"} />
        </div>
        <Advertisement className={"w-full h-[35%] flex flex-col"} />
      </div>
    </div>
  );
};

export default Page;
