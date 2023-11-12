"use client";

import { useState, useEffect, useContext } from "react";
import Timetable from "@/components/schedule";
// import SessionSwitcher from "@/components/SessionSwitcher";
import ScheduleSwitcher from "@/components/ScheduleSwitcher";
import ImaluumClient from "@/utils/imaluumClient";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<Courses[]>();

  const { courses } = ImaluumClient() || {};

  useEffect(() => {
    if (subjects) {
      // console.log("events", subjects);
      setIsLoading(false);
    }
  }, [subjects]);

  return (
    <div className="flex-1 min-h-screen ">
      {!courses ? (
        <div>Loading...</div>
      ) : (
        <div className="w-fit p-2">
          {/* <SessionSwitcher setEvents={setEvents} /> */}
          <ScheduleSwitcher courses={courses} setEvents={setSubjects} />
        </div>
      )}

      <Timetable events={isLoading ? [] : subjects[0].schedule} />
    </div>
  );
};

export default Page;
