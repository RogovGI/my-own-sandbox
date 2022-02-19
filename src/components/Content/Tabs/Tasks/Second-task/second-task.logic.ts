import { bubbleSort } from "../Fourth-task/fourth-task.logic";

export type TSecondTaskLogic = {
  elements: Array<number>;
  indexes: Array<number>;
};

export function secondTaskLogic(
  incomingArray: Array<number>
): TSecondTaskLogic {
  const sortedArray = bubbleSort(incomingArray).reverse();

  let resultElements: Array<number> = [];
  let resultIndexes: Array<number> = [];

  sortedArray.forEach((element, index) => {
    if (!resultElements.length && !resultIndexes.length) {
      resultElements.push(element);
      resultIndexes.push(incomingArray.findIndex((item) => item === element));
    } else if (
      resultElements.length === 1 &&
      resultIndexes.length === 1 &&
      index !== 0 &&
      sortedArray[index - 1] !== element
    ) {
      resultElements.push(element);
      resultIndexes.push(incomingArray.findIndex((item) => item === element));
    }
  });

  return {
    elements: resultElements.length < 2 ? [] : resultElements,
    indexes: resultIndexes.length < 2 ? [] : resultIndexes,
  };
}
