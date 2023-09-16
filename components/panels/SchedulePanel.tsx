"use client";

import { useSelector } from "react-redux";
import { currentCalendar } from "../../store/modules/calendar";
import ScheduleCalendar from "../ScheduleCalendar";
import getThisWeek from "../../util/getThisWeek";
import { useState, useEffect } from "react";
// import AddScheduleButton from "../components/AddScheduleButton";
// import AddScheduleModal from "../../../components/AddScheduleModal";
import formatDay from "../../util/formatDay";

const SchedulePanel = () => {
  const { year, month, days } = useSelector(currentCalendar);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<string>(formatDay(new Date()));
  const [timeIndex, setTimeIndex] = useState<number>(0);

  return (
    <div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2 bg-slate-100 dark:bg-zinc-900">
      <ScheduleCalendar
        days={getThisWeek(days)}
        setModalDate={setModalDate}
        setTimeIndex={setTimeIndex}
        setIsOpenModal={setIsOpenModal}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    </div>
  );
};

export default SchedulePanel;
