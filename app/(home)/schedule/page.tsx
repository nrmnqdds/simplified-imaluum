"use client";

import { useState, useEffect, useContext } from "react";
import Timetable from "@/components/schedule";
// import SessionSwitcher from "@/components/SessionSwitcher";
import SessionSwitcher2 from "@/components/SessionSwitcher2";
import { ImaluumContext } from "@/app/context/ImaluumProvider";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Courses[]>();

  const context = useContext(ImaluumContext);

  useEffect(() => {
    if (courses) {
      // console.log("events", courses);
      setIsLoading(false);
    }
  }, [courses]);

  return (
    <div className="flex-1 min-h-screen ">
      {!context ? (
        <div>Loading...</div>
      ) : (
        <div className="w-fit p-2">
          {/* <SessionSwitcher setEvents={setEvents} /> */}
          <SessionSwitcher2 context={context} setEvents={setCourses} />
        </div>
      )}

      <Timetable events={isLoading ? [] : courses[0].schedule} />
    </div>
  );
};

export default Page;
