import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type ScheduleProps = {
  schedule: Subject[];
  sessionName: string;
  sessionQuery: string;
};

const ScheduleSwitcher = ({
  setEvents,
  courses,
}: { setEvents: any; courses: ScheduleProps[] }) => {
  const [selected, setSelected] = useState(courses[0]?.sessionName);

  useEffect(() => {
    if (selected) {
      const course = courses.find((course) => course.sessionName === selected);

      setEvents(course?.schedule);
    }
  }, [selected, courses, setEvents]);

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
};

export default ScheduleSwitcher;
