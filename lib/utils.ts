export function findAverage(...numbers: number[]): number {
  return numbers.reduce((sum, number) => sum + number, 0) / numbers.length;
}

export function findMedian(...numbers: number[]): number {
  const sorted = numbers.sort((a, b) => a - b);

  return (
    (sorted[Math.floor((sorted.length - 1) / 2)] +
      sorted[Math.ceil((sorted.length - 1) / 2)]) /
    2
  );
}

export function toFixed(number: number): string {
  return Number.isInteger(number) ? String(number) : number.toFixed(2);
}
