export const range = (keyCount: number) => {
  const result: number[] = [];
  for (let i = 0; i < keyCount; i++) {
    result.push(i);
  }
  return result;
};

export const areDateSame = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const addDateBy = (date: any, count: any) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + count));
};

export const getMonday = () => {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  return new Date(today.setDate(first));
};
