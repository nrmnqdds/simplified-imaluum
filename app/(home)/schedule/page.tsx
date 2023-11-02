"use client";

import { useState, useEffect } from "react";
import Timetable from "@/components/schedule";
import SessionSwitcher from "@/components/SessionSwitcher";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Subject[]>();

  useEffect(() => {
    if (events) {
      // console.log("events", events);
      setIsLoading(false);
    }
  }, [events]);

  return (
    <div className="flex-1 min-h-screen ">
      <div className="w-fit p-2">
        <SessionSwitcher setEvents={setEvents} />
      </div>

      <Timetable events={isLoading ? [] : events} />
    </div>
  );
};

export default Page;
