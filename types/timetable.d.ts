type Subject = {
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
  day: number;
};

type TimetableConfig = {
  startDay: number;
  endDay: number;
  startHour: number;
  endHour: number;
};
