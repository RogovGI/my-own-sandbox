export function sixthTaskLogic(matrix: Array<Array<number>>): Array<number> {
  const numbersByRowsOfMatrix: Array<Array<number>> = [];

  matrix.forEach((column, columnIndex) => {
    column.forEach((rowElement, rowIndex) => {
      if (columnIndex === 0) {
        numbersByRowsOfMatrix[rowIndex] = [rowElement];
      } else {
        numbersByRowsOfMatrix[rowIndex].push(rowElement);
      }
    });
  });

  return (
    numbersByRowsOfMatrix[0]
      .filter((elementOfFirstRow) => {
        const [_firstRow, ...otherRows] = numbersByRowsOfMatrix;

        const otherRowsContainsThisNumber = otherRows.every((row) =>
          row.includes(elementOfFirstRow)
        );
        const notAllColumnsContainsThisNumber = matrix.some(
          (column) => !column.includes(elementOfFirstRow)
        );

        return otherRowsContainsThisNumber && notAllColumnsContainsThisNumber;
      })
      // remove repeated elements
      .reduce((uniqueNumbers, item) => {
        if (uniqueNumbers.includes(item)) {
          return uniqueNumbers;
        } else {
          return [...uniqueNumbers, item];
        }
      }, [] as Array<number>)
  );
}
