"use client";

import ScheduleSwitcher from "@/components/ScheduleSwitcher";
import Timetable from "@/components/schedule";
import { Button } from "@/components/ui/button";
import useSchedule from "@/hooks/useSchedule";
import { cn } from "@/lib/common/cn";
import { getScheduleFromSession } from "@/lib/server/schedule-scraper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoReload } from "react-icons/io5";

const Page = () => {
  const [subjects, setSubjects] = useState<Courses[]>();
  const { schedule, setSchedule } = useSchedule();

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (subjects) {
  //     console.log("subjects: ", subjects[0].sessionQuery);
  //   }
  // }, [subjects]);

  const refetchData = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const res = await getScheduleFromSession(
        subjects[0].sessionQuery,
        subjects[0].sessionName
      );
      if (res) {
        const newSchedule = schedule.map((s) => {
          if (s.sessionQuery === res.sessionQuery) {
            return { ...s, schedule: res.schedule };
          }
          return s;
        });

        setSchedule(newSchedule);
        // console.log("newSchedule: ", newSchedule);

        return res;
      }
    },
    enabled: false,
  });

  return (
    <div className="flex-1 min-h-screen">
      <div className="w-fit p-2 flex gap-5">
        <ScheduleSwitcher courses={schedule} setEvents={setSubjects} />
        <Button
          type="button"
          onClick={() => {
            queryClient.invalidateQueries();
            refetchData.refetch();
          }}
          disabled={refetchData.isRefetching}
        >
          <span
            className={cn(
              "text-white",
              refetchData.isRefetching && "animate-spin"
            )}
          >
            <IoReload />
          </span>
        </Button>
      </div>
      <Timetable events={!subjects ? [] : subjects[0].schedule} />
    </div>
  );
};

export default Page;
