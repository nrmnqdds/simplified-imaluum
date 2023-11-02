const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface TimetableWeekDaysProps {
  startDay: number;
  endDay: number;
}

export default function TimetableWeekDays({
  startDay,
  endDay,
}: TimetableWeekDaysProps) {
  return (
    <div
      className="duration-300
        top-16 left-0 md:left-64 right-0 xl:right-96 h-8 pl-8
        bg-slate-100
        border-b border-slate-200 dark:border-zinc-600 dark:bg-zinc-900 z-10"
    >
      <div className="w-full h-full flex flex-row">
        {days.slice(startDay, endDay + 1).map((day, index) => (
          <div
            key={index}
            className="flex-1 h-full
              flex flex-col items-center justify-center"
          >
            <p className="text-slate-500 text-xs font-bold">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
