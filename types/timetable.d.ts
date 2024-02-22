type Subject = {
  sessionName?: any;
  id: string;
  courseCode: string;
  courseName: string;
  section: string;
  chr: string;
  color: string;
  timestamps: WeekTime;
  venue: string;
  lecturer: string;
};

type WeekTime = {
  start: string;
  end: string;
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

type TimetableConfig = {
  startDay: number;
  endDay: number;
  startHour: number;
  endHour: number;
};

type Courses = {
  schedule: Subject[];
  sessionName: string;
  sessionQuery: string;
};
