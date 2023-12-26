export const getDate = () => {
  const date = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const suffix = getSuffix(dateNum);
  const year = date.getFullYear();

  return `${day}. ${month} ${dateNum}${suffix}, ${year}`;
};

export const getSuffix = (dateNum: number) => {
  if (dateNum >= 11 && dateNum <= 13) {
    return "th";
  }
  switch (dateNum % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
