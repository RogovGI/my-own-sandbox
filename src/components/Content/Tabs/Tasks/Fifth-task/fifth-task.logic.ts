const SEPARATORS = ["_", ".", ",", ";", ":", "\n", "\t", "!", "?"];

export type TFifthTaskLogicResult = {
  withNumberWords: string[];
  vowelLettersWordsCount: number;
};

function getSplittedString(incomingString: string): Array<string> {
  return SEPARATORS.reduce(
    (accumulator, separator) => {
      let newResult: string[] = [];

      accumulator.forEach((tempResult) => {
        newResult = newResult.concat(tempResult.split(separator));
      });

      return newResult;
    },
    [incomingString]
  );
}

export function fifthTaskLogic(text: string): TFifthTaskLogicResult {
  const textWords: Array<string> = getSplittedString(text);

  const result: TFifthTaskLogicResult = textWords.reduce(
    (accumulator, word) => {
      if (/^.*(\+|\*|\/|\-).*$/.test(word) && /\d/.test(word.slice(-1))) {
        accumulator.withNumberWords.push(word);
      }

      if (
        word.includes("a") &&
        word.includes("e") &&
        word.includes("i") &&
        word.includes("o") &&
        word.includes("u") &&
        word.includes("y")
      ) {
        accumulator.vowelLettersWordsCount++;
      }

      return accumulator;
    },
    {
      withNumberWords: [] as string[],
      vowelLettersWordsCount: 0,
    }
  );

  return result;
}
