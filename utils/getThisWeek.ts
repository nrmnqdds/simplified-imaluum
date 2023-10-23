export default function getThisWeek(days: CalendarDays[]): CalendarDays[] {
  const isThisWeekAndSunday = (element: CalendarDays) =>
    element.isThisWeek && element.dayOfWeek === 0;
  const thisWeekAndSundayIndex = days.findIndex(isThisWeekAndSunday);
  return days.slice(thisWeekAndSundayIndex, thisWeekAndSundayIndex + 7);
}
