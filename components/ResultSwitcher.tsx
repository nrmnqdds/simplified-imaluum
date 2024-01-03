import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment, useEffect, useState } from "react";

export function ResultSwitcher({
  setEvents,
  setSession,
  courses,
}: { setEvents: any; setSession: any; courses: any }) {
  const [selected, setSelected] = useState(courses[0]?.sessionName);

  useEffect(() => {
    if (selected) {
      setSession(selected);
    }
  }, [selected, setSession]);

  useEffect(() => {
    if (courses) {
      courses.map((course: any) => {
        if (course.sessionName === selected) {
          setEvents(course.result);
        }
      });
    }
  }, [courses, selected, setEvents]);
  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-[180px] bg-primary ring-ring text-foreground focus:ring-0">
        <SelectValue aria-label={selected}>{selected}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-primary-foreground">
        {courses?.map((course: any, index: number) => (
          <SelectItem
            key={index}
            value={course.sessionName}
            onClick={() => setSelected(course.sessionName)}
            className="focus:bg-primary focus:text-white"
          >
            {course.sessionName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
