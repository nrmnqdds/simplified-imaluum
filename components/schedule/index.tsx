import TimetableWeekDays from "./TimetableWeekDays";
import TimetableRow from "./TimetableRow";
import moment from "moment";
import TimetableEventBlock from "./TimetableEventBlock";
import range from "@/utils/range";

interface TimetableProps {
  events: TimetableEvent[];
}

export default function Timetable({ events }: TimetableProps) {
  function getTimetableConfig(): TimetableConfig {
    let startDay = 0,
      endDay = 6,
      startHour = 8,
      endHour = 17;

    for (const event of events) {
      // console.log("event", event);
      if (event.weekTime.day < startDay) startDay = event.weekTime.day;
      if (event.weekTime.day > endDay) endDay = event.weekTime.day;
      const x = moment(event.weekTime.start, "HH:mm:ss").get("hours");
      if (x < startHour) startHour = x;
      const y = moment(event.weekTime.end, "HH:mm:ss").get("hours");
      if (y > endHour) endHour = y;
    }

    startHour = Math.max(startHour - 1, 0);
    endHour = Math.min(endHour + 2, 23);

    return {
      startDay,
      endDay,
      startHour,
      endHour,
    };
  }

  const config = getTimetableConfig();

  function getEvents() {
    return events;
  }

  return (
    <div className="relative h-full bg-transparent">
      <TimetableWeekDays startDay={config.startDay} endDay={config.endDay} />
      {range(config.startHour, config.endHour).map((hour, index) => (
        <TimetableRow
          key={index}
          hour={hour}
          showHour={index !== 0}
          numberOfDays={config.endDay - config.startDay + 1}
        />
      ))}
      <div className="absolute top-0 bottom-0 left-0 -right-px pl-14">
        <div className="relative w-full h-full">
          {getEvents().map((event, index) => (
            <TimetableEventBlock
              key={index}
              event={event}
              config={config}
              onClick={event.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
