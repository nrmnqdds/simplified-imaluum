import { cn } from "@/lib/common/cn";
import moment from "moment";

const predefinedColors = [
  "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
  "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
  "bg-fuchsia-200 text-fuchsia-700 border-fuchsia-500 hover:bg-fuchsia-300 hover:text-fuchsia-800",
  "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
  "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
  "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
  "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
  "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
  "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
  "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
];

interface TimetableEventBlockProps {
  event: Subject;
  config: TimetableConfig;
  onClick: (event: Subject) => void;
}

export default function TimetableEventBlock({
  event,
  config,
  onClick,
}: TimetableEventBlockProps) {
  const startMoment = moment(event.timestamps.start, "HH:mm:ss");
  const endMoment = moment(event.timestamps.end, "HH:mm:ss");
  const numberOfDays = config.endDay - config.startDay + 1;

  const top =
    64 *
      (startMoment.get("hours") +
        startMoment.get("minutes") / 60 -
        config.startHour) +
    32 +
    2;

  const height =
    64 *
      (endMoment.get("hours") +
        endMoment.get("minutes") / 60 -
        (startMoment.get("hours") + startMoment.get("minutes") / 60)) -
    5;

  const left = `calc(${
    (100 / numberOfDays) * (event.timestamps.day - config.startDay)
  }% )`;

  const width = `calc(${100 / numberOfDays}% - 5px)`;

  return (
    <button
      type="button"
      className={cn(
        "absolute rounded-md duration-100 p-1 border md:border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        [event.color],
      )}
      style={{
        top,
        height,
        left,
        width,
      }}
      onClick={() => onClick(event)}
    >
      <p className="text-[8px] top-1 left-1 absolute flex sm:hidden">
        {moment(event.timestamps.start, "HH:mm:ss").format("h:mma")}
      </p>
      <p className="text-[8px] bottom-1 right-1 absolute flex sm:hidden">
        {moment(event.timestamps.end, "HH:mm:ss").format("h:mma")}
      </p>
      <p className="text-[8px] hidden sm:block md:text-xs md:font-bold">
        {event.courseCode}
      </p>
      <div className="block sm:hidden">
        <p className="text-[8px] md:text-xs font-bold">
          {event.courseCode.split(" ")[0]}
        </p>
        <p className="text-[8px] md:text-xs font-bold">
          {event.courseCode.split(" ")[1]}
        </p>
      </div>
      <p className="text-[8px] hidden sm:block md:text-xs md:font-bold">
        {moment(event.timestamps.start, "HH:mm:ss").format("h:mma")} -{" "}
        {moment(event.timestamps.end, "HH:mm:ss").format("h:mma")}
      </p>
    </button>
  );
}
