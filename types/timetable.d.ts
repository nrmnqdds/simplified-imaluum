type CourseSchedule = {
  course: Course;
  section: number;
  session: string;
  semester: number;
  venues: string[];
  lecturers: string[];
  week_times: WeekTime[];
  color: string;
};

type WeekTime = {
  start: string;
  end: string;
  day: number;
};

type TimetableEvent = {
  title: string;
  color: string;
  weekTime: WeekTime;
  onClick: () => void;
};

type TimetableConfig = {
  startDay: number;
  endDay: number;
  startHour: number;
  endHour: number;
};
