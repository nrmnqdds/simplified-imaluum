import range from "@/lib/common/range";
import moment from "moment";
import { Fragment, useState } from "react";
import TimetableEventBlock from "./TimetableEventBlock";
import TimetableModal from "./TimetableModal";
import TimetableRow from "./TimetableRow";
import TimetableWeekDays from "./TimetableWeekDays";

interface TimetableProps {
  events: Subject[];
}

export default function Timetable({ events }: TimetableProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentSubject, setCurrentSubject] = useState<Subject>();

  function getTimetableConfig(): TimetableConfig {
    let startDay = 0;
    let endDay = 6;
    let startHour = 8;
    let endHour = 23;

    for (const event of events) {
      // console.log("event", event);
      if (event.timestamps.day < startDay) startDay = event.timestamps.day;
      if (event.timestamps.day > endDay) endDay = event.timestamps.day;
      const x = moment(event.timestamps.start, "HH:mm:ss").get("hours");
      if (x < startHour) startHour = x;
      const y = moment(event.timestamps.end, "HH:mm:ss").get("hours");
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

  const handleModal = (event: Subject) => {
    setCurrentSubject(event);
    setOpenModal(!openModal);
  };

  return (
    <Fragment>
      <TimetableModal
        currentSubject={currentSubject}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
        <div className="absolute top-0 bottom-0 left-0 -right-px sm:pl-14">
          <div className="relative w-full h-full">
            {getEvents().map((event, index) => (
              <TimetableEventBlock
                key={index}
                event={event}
                onClick={handleModal}
                config={config}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
