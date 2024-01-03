import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const predefinedColors = [
  "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
  "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
  "bg-fuchsia-200 text-fuchsia-700 border-fuchsia-500 hover:bg-fuchsia-300 hover:text-fuchsia-800",
  "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
  "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
  "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
  "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
  "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
  "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
  "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
];

const ScheduleSwitcher = ({
  setEvents,
  courses,
}: { setEvents: any; courses: any }) => {
  const [selected, setSelected] = useState(courses[0]?.sessionName);
  const [coloredEvents, setColoredEvents] = useState<Subject[]>();

  useEffect(() => {
    const titleToColorMap = {}; // Map event titles to colors

    const mappedEvents = courses.map((course) => {
      const eventsWithColor = course?.schedule.map((event) => {
        let _color = titleToColorMap[event.courseCode];
        if (!_color) {
          // If no color assigned for this title, find an available color
          const availableColors = predefinedColors.filter(
            (c) => !Object.values(titleToColorMap).includes(c)
          );

          if (availableColors.length > 0) {
            // If there are available colors, pick one randomly
            const randomColorIndex = Math.floor(
              Math.random() * availableColors.length
            );
            _color = availableColors[randomColorIndex];
          } else {
            // If all colors have been used, assign a random color from predefinedColors
            const randomColorIndex = Math.floor(
              Math.random() * predefinedColors.length
            );
            _color = predefinedColors[randomColorIndex];
          }

          // Store the assigned color for this title
          titleToColorMap[event.courseCode] = _color;
        }
        return {
          ...event,
          color: _color,
        };
      });

      return { ...course, schedule: eventsWithColor };
    });

    setColoredEvents(mappedEvents);
  }, [courses]);

  useEffect(() => {
    // console.log("selected", selected);
    if (coloredEvents) {
      const selectedEvents = coloredEvents.filter(
        (course) => course?.sessionName === selected
      );
      // console.log("selectedEvents", selectedEvents);
      setEvents(selectedEvents);
    }
  }, [coloredEvents, selected, setEvents]);

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
