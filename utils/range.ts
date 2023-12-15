export default function range(start: number, stop: number): number[] {
  const result: number[] = [];
  for (let i = start; i < stop; i++) {
    result.push(i);
  }
  return result;
}
