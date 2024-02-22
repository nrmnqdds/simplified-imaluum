"use client";

import ScheduleSwitcher from "@/components/ScheduleSwitcher";
import Timetable from "@/components/schedule";
import useSchedule from "@/hooks/useSchedule";
import { useState } from "react";

const Page = () => {
  const [subjects, setSubjects] = useState<Courses[]>();
  const { schedule } = useSchedule();

  return (
    <div className="flex-1 min-h-screen">
      <div className="w-fit p-2 flex gap-5">
        <ScheduleSwitcher courses={schedule} setEvents={setSubjects} />
      </div>
      <Timetable events={!subjects ? [] : subjects[0].schedule} />
    </div>
  );
};

export default Page;
