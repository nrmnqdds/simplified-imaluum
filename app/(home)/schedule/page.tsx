"use client";

import { useState } from "react";
import Timetable from "@/components/schedule";
import ScheduleSwitcher from "@/components/ScheduleSwitcher";
import useSchedule from "@/hooks/useSchedule";

const Page = () => {
  const [subjects, setSubjects] = useState<Courses[]>();
  const { schedule } = useSchedule();

  return (
    <div className="flex-1 min-h-screen">
      {!schedule ? (
        <div>Loading...</div>
      ) : (
        <div className="w-fit p-2">
          {/* <SessionSwitcher setEvents={setEvents} /> */}
          <ScheduleSwitcher courses={schedule} setEvents={setSubjects} />
        </div>
      )}
      <Timetable events={!subjects ? [] : subjects[0].schedule} />
    </div>
  );
};

export default Page;
