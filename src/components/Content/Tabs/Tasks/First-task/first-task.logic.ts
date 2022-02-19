export type TResultValue = {
  value: number;
  argument: number;
};

export type TCalculationResult = {
  mainCalculationResult: TResultValue[];
  personalTaskCalculationResult: number;
};

export function taskFunction(x: number): number {
  return (
    x * Math.pow(Math.E, x) +
    2 * Math.sin(x) -
    Math.sqrt(Math.abs(Math.pow(x, 3) - Math.pow(x, 2)))
  );
}

export function firstTaskMainCalculation(
  fromArgument: number,
  toArgument: number,
  step: number
): TCalculationResult {
  let currentArgument: number = fromArgument;
  let result: TResultValue[] = [];

  while (currentArgument <= toArgument) {
    result.push({
      value: taskFunction(currentArgument),
      argument: currentArgument,
    });

    currentArgument += step;
  }

  const personalTaskCalculationResult = personalTaskCalculation(result);

  return { mainCalculationResult: result, personalTaskCalculationResult };
}

export function personalTaskCalculation(allValues: TResultValue[]): number {
  return allValues.reduce((accumulator, { value }) => {
    if (Math.trunc(value) % 2 === 0 && value < 0) {
      return ++accumulator;
    }

    return accumulator;
  }, 0);
}
