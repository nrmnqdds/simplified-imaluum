import Disciplinary from "../Disciplinary";
import Advertisement from "../Advertisements";

const HomePanel = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="h-screen flex flex-col justify-between">
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-2">
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
          <Disciplinary className={"border-zinc-500 border rounded-2xl"} />
        </div>
        <Advertisement className={"w-full h-[35%] flex flex-col"} />
      </div>
    </div>
  );
};

export default HomePanel;
