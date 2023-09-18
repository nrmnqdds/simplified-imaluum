import { tDays, tScheduleDetail } from "../index";
import { dayOfWeek } from "@util/dayOfWeek";
import { hours24 } from "@util/HoursAday";
import {
  addSchedule,
  schedules,
  removeSchedule,
  clearAllEvents as clearAllEventsAction,
} from "../store/modules/schedule";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SessionSwitcher from "./SessionSwitcher";
import moment from "moment";

export default function ScheduleCalendar({
  days,
}: {
  days: tDays[];
  setTimeIndex: Dispatch<SetStateAction<number>>;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const scheduleData = useSelector(schedules);
  const [deleteSchedule, setDeleteSchedule] = useState<{
    date: string;
    index: number;
  }>({
    date: "",
    index: 0,
  });

  const predefinedColors = [
    "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
    "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
    "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
    "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
    "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
    "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
    "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
    "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
    "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
    "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  ];

  const usedColors: string[] = [];

  // Color mapping for event titles
  const colorMapping: Record<string, string> = {};

  // Function to get a color for an event bg.
  function getColorForTitle(title: string) {
    if (!colorMapping[title]) {
      // Generate an array of available colors that haven't been used
      const availableColors = predefinedColors.filter(
        (color) => !usedColors.includes(color)
      );

      if (availableColors.length === 0) {
        // If all colors have been used, assign a random color from the predefinedColors array
        colorMapping[title] =
          predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
      } else {
        // Assign the first available color and mark it as used
        const selectedColor = availableColors[0];
        colorMapping[title] = selectedColor;
        usedColors.push(selectedColor);
      }
    }
    return colorMapping[title];
  }

  // Function to clear all events
  const clearAllEvents = () => {
    dispatch(clearAllEventsAction());
  };

  const scheduleHandle = (
    cursor: { top: number; left: number },
    scheduleData: { date: string; index: number }
  ) => {
    setDeleteSchedule(scheduleData);
  };

  const addCustomEvent = (date: string, data: tScheduleDetail) => {
    dispatch(addSchedule({ date, data }));
  };

  const handleCurrentScheduleChange = (newCurrentSchedule: any) => {
    clearAllEvents();
    newCurrentSchedule.schedule.forEach(
      (
        item: { days: any; courseCode: any; time: (string | any[])[] },
        index: any
      ) => {
        const days = item.days;
        const courseCode = item.courseCode;

        // Function to add leading zero if necessary
        function addLeadingZero(timeString: string | any[]) {
          return timeString.length === 3 ? `0${timeString}` : timeString;
        }

        const startTime = moment(addLeadingZero(item.time[0]), "HHmm");
        const startHour = Number(startTime.format("HH"));
        const startMinute = Number(startTime.format("mm"));

        const endTime = moment(addLeadingZero(item.time[1]), "HHmm");
        const endHour = Number(endTime.format("HH"));
        const endMinute = Number(endTime.format("mm"));

        function getDateForDayOfWeek(inputDay: any) {
          const currentDate = new Date();
          const currentDayOfWeek = currentDate.getDay();
          const dayDifference = inputDay - currentDayOfWeek;
          currentDate.setDate(currentDate.getDate() + dayDifference);
          return currentDate; // Return as Date object
        }

        const eventDate = getDateForDayOfWeek(days);

        const newEvent: tScheduleDetail = {
          start: { hour: startHour - 8, minute: startMinute }, // Set the start time
          end: { hour: endHour - 8, minute: endMinute }, // Set the end time
          color: "green",
          title: courseCode,
        };

        addCustomEvent(moment(eventDate).format("YYYY-MM-DD"), newEvent);
      }
    );
  };

  return (
    <>
      <div className="overflow-auto w-full flex flex-col mb-2" id="schedule">
        <SessionSwitcher
          onUpdateCurrentSchedule={handleCurrentScheduleChange}
        />
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 flex bg-slate-100 dark:bg-zinc-900 z-20">
            <div className="min-w-[70px] w-[70px] dark:bg-zinc-900 bg-slate-100" />
            {days.map((day, index) => (
              <div
                className="flex-1 min-w-[81px] flex flex-col text-zinc-900 dark:text-white dark:bg-zinc-900 bg-slate-100 z-20 pt-4"
                key={day.date}
              >
                <div className="text-center font-light text-sm">
                  {dayOfWeek[index]}
                </div>
                <div className="text-center font-light text-2xl p-1">
                  <div
                    className={`w-10 h-10 rounded-full m-auto flex justify-center items-center
                      ${
                        day.isToday &&
                        "bg-blue-500 text-zinc-900 dark:text-white"
                      }`}
                  >
                    {day.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1">
            <div className="bg-slate-100 dark:bg-zinc-900 sticky left-0 top-0 w-20 min-w-[70px] z-10">
              {hours24.map((hour) => (
                <div
                  className="font-light text-[12px] h-[60px] text-right pr-2 text-zinc-900 dark:text-white"
                  key={hour.text}
                >
                  {hour.text}
                </div>
              ))}
            </div>
            <div className="flex flex-1 pt-2">
              {days.map((day) => (
                <div
                  className="flex-1 min-w-[81px] flex flex-col relative"
                  key={`scheduleline${day.day}`}
                >
                  {hours24.map((hour, index) => (
                    <div
                      key={`schedule${hour.text}`}
                      className="border border-solid border-transparent border-r-zinc-200 dark:border-r-zinc-800 border-t-zinc-200 dark:border-t-zinc-800 h-[60px]"
                    />
                  ))}
                  {scheduleData[day.day] && (
                    <>
                      {scheduleData[day.day].map((s, idx) => {
                        const t = s.start.hour * 60 + s.start.minute;
                        const top = `${t}px`;
                        let h =
                          (s.end.hour - s.start.hour) * 60 -
                          s.start.minute +
                          s.end.minute;
                        if (h < 20) h = 20;
                        const height = `${h}px`;
                        // Format the minutes with leading zero
                        const startMinuteFormatted = s.start.minute
                          .toString()
                          .padStart(2, "0");
                        const endMinuteFormatted = s.end.minute
                          .toString()
                          .padStart(2, "0");
                        return (
                          <div
                            key={idx}
                            className={`scheduleBox flex items-center justify-center absolute left-0 rounded w-5/6 p-[2px] text-[12px] font-bold overflow-y-auto border border-solid ${getColorForTitle(
                              s.title
                            )}`}
                            style={{
                              top: top,
                              height: height,
                            }}
                            data-schedule={{ date: day.day, index: idx }}
                            onClick={(e) => {
                              scheduleHandle(
                                { top: e.clientY, left: e.clientX },
                                { date: day.day, index: idx }
                              );
                            }}
                          >
                            {s.title} <br />
                            {s.start.hour + 8}:{startMinuteFormatted} -{" "}
                            {s.end.hour + 8}:{endMinuteFormatted}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
