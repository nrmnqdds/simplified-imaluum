export default function range(start: number, stop: number): number[] {
  var result: number[] = [];
  for (var i = start; i < stop; i++) {
    result.push(i);
  }
  return result;
}
