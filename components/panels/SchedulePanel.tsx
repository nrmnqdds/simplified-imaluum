"use client";

import { useSelector } from "react-redux";
import { currentCalendar } from "../../store/modules/calendar";
import ScheduleCalendar from "../ScheduleCalendar";
import getThisWeek from "@utils/getThisWeek";
import { useState } from "react";

const SchedulePanel = () => {
  const { year, month, days } = useSelector(currentCalendar);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [timeIndex, setTimeIndex] = useState<number>(0);

  return (
    <div className="flex flex-col h-full overflow-x-scroll lg:overflow-hidden flex-1 pr-2">
      <ScheduleCalendar
        days={getThisWeek(days)}
        setTimeIndex={setTimeIndex}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    </div>
  );
};

export default SchedulePanel;
