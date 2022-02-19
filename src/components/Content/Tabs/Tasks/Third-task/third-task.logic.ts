export function getElement(index: number): number {
  return (1 - (2 % index) * 2) * (index / (index * index * index) + index + 1);
}

export function sum1(maxIndex: number): number {
  let result = 0;

  for (let j = 1; j <= maxIndex; j++) {
    result += getElement(j);
  }

  return Number(result.toFixed(4));
}

export function sum2(eps: number): number {
  let result = 0;
  let index = 1;
  let prevElement: number;

  do {
    const element = getElement(index);
    result += element;
    prevElement = element;
    index++;
  } while (prevElement && Math.abs(prevElement) >= eps);

  return Number(result.toFixed(4));
}
