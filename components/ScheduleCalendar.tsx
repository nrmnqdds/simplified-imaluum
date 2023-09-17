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

        // dispatch(
        //   removeSchedule({
        //     date: String(eventDate),
        //     index: index,
        //   })
        // );

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
                      className="border border-solid border-transparent border-r-zinc-200 border-t-zinc-200 h-[60px]"
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
                        return (
                          <div
                            key={idx}
                            className="scheduleBox flex items-center justify-center absolute left-0 rounded w-5/6 p-[2px] text-[12px] font-light text-zinc-900 dark:text-white overflow-y-auto"
                            style={{
                              top: top,
                              height: height,
                              background: s.color,
                            }}
                            data-schedule={{ date: day.day, index: idx }}
                            onClick={(e) => {
                              scheduleHandle(
                                { top: e.clientY, left: e.clientX },
                                { date: day.day, index: idx }
                              );
                            }}
                          >
                            {s.title}
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
