"use client";

import { useSelector } from "react-redux";
import { currentCalendar } from "@/store/modules/calendar";
import ScheduleCalendar from "@components/ScheduleCalendar";
import getThisWeek from "@utils/getThisWeek";
import { useState } from "react";

const Page = () => {
  const { days } = useSelector(currentCalendar);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [timeIndex, setTimeIndex] = useState<number>(0);

  return (
    <div className="flex-1 min-h-screen">
      <ScheduleCalendar
        days={getThisWeek(days)}
        setTimeIndex={setTimeIndex}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    </div>
  );
};

export default Page;
