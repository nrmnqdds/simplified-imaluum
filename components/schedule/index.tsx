import TimetableWeekDays from "./TimetableWeekDays";
import TimetableRow from "./TimetableRow";
import moment from "moment";
import TimetableEventBlock from "./TimetableEventBlock";
import range from "@/utils/range";
import { useState, Fragment } from "react";
import TimetableModal from "./TimetableModal";

interface TimetableProps {
  events: Subject[];
}

export default function Timetable({ events }: TimetableProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentSubject, setCurrentSubject] = useState<Subject>();

  function getTimetableConfig(): TimetableConfig {
    let startDay = 0,
      endDay = 6,
      startHour = 8,
      endHour = 23;

    for (const event of events) {
      // console.log("event", event);
      if (event.timestamps[0].day < startDay)
        startDay = event.timestamps[0].day;
      if (event.timestamps[0].day > endDay) endDay = event.timestamps[0].day;
      const x = moment(event.timestamps[0].start, "HH:mm:ss").get("hours");
      if (x < startHour) startHour = x;
      const y = moment(event.timestamps[0].end, "HH:mm:ss").get("hours");
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
        <div className="absolute top-0 bottom-0 left-0 -right-px pl-14">
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
