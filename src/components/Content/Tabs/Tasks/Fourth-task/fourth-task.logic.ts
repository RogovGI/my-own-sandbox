export function bubbleSort(incomingArray: number[]): number[] {
  let swapped: boolean = false;
  const result = [...incomingArray];

  do {
    swapped = false;
    result.forEach((item, index) => {
      if (item > result[index + 1]) {
        let temp = item;

        result[index] = result[index + 1];
        result[index + 1] = temp;

        swapped = true;
      }
    });
  } while (swapped);

  return result;
}

export function findElementQ(incomingArray: Array<number>): number {
  return Math.min(...incomingArray.filter((num) => Math.abs(num % 2) === 0));
}

export function getReverseNumber(incomingNumber: number): number {
  return Number(String(incomingNumber).split("").reverse().join(""));
}
