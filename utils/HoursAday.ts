import { tHours } from "../index";

function createHoursArray() {
  const hours: Array<tHours> = [];
  for (let i = 8; i <= 18; i++) {
    const item = { text: `${i} AM`, hour: i };
    if (i >= 12) {
      if (i > 12) {
        const item = { text: `${i - 12} PM`, hour: i };
        hours.push(item);
      } else {
        const item = { text: `${i} PM`, hour: i };
        hours.push(item);
      }

      continue;
    }

    hours.push(item);
  }
  return hours;
}

export const hours24 = createHoursArray();
