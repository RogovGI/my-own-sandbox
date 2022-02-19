import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactElement,
} from "react";

import { Button, NumericTextField } from "../../../../common";

import { sixthTaskLogic } from "./sixth-task.logic";

import styles from "./sixth-task.module.css";

export default function FourthTask(): ReactElement {
  const [sizeR, updateSizeR] = useState<number>(6);
  const [sizeC, updateSizeC] = useState<number>(6);

  const [matrixValues, updateMatrixValues] = useState<Array<Array<number>>>(
    new Array(sizeC).fill(new Array(sizeR).fill(0))
  );

  const [minValue, updateMinValue] = useState<number>(-1000);
  const [maxValue, updateMaxValue] = useState<number>(1000);

  const [logicTaskResult, updateLogicTaskResult] = useState<Array<number>>([]);

  useEffect(() => {
    if (sizeR >= 1 && sizeR !== matrixValues[0].length) {
      // We can do it because all columns have same count of rows
      if (sizeR > matrixValues[0].length) {
        const diff = sizeR - matrixValues[0].length;

        const newValues = matrixValues.map((columnValue) => [
          ...columnValue,
          ...new Array(diff).fill(0),
        ]);

        updateMatrixValues(newValues);
      } else {
        const diff = matrixValues[0].length - sizeR;

        const newValues = [...matrixValues].map((columnValue) => {
          const newColumnValue = [...columnValue];
          newColumnValue.length = matrixValues[0].length - diff;

          return newColumnValue;
        });

        updateMatrixValues(newValues);
      }
    }
  }, [sizeR, matrixValues]);

  useEffect(() => {
    if (sizeC >= 1 && sizeC !== matrixValues.length) {
      if (sizeC > matrixValues.length) {
        const diff = sizeC - matrixValues.length;

        const newValues = [...matrixValues].concat(
          new Array(diff).fill(new Array(sizeR).fill(0))
        );
        updateMatrixValues(newValues);
      } else {
        const diff = matrixValues.length - sizeC;

        const newValues = [...matrixValues];
        newValues.length = matrixValues.length - diff;

        updateMatrixValues(newValues);
      }
    }
  }, [sizeC, sizeR, matrixValues]);

  useEffect(() => {
    updateLogicTaskResult(sixthTaskLogic(matrixValues));
  }, [matrixValues]);

  const checkIsValidateErrorByMinMaxValue = useCallback(
    (value: number): boolean => value > maxValue || value < minValue,
    [minValue, maxValue]
  );

  const updateOneValue = useCallback(
    (columnIndex: number, rowIndex: number, value?: number): void => {
      if (columnIndex < sizeC && rowIndex < sizeR) {
        const newValues: Array<Array<number>> = [...matrixValues];

        if (typeof value === "number" && !isNaN(value)) {
          newValues[columnIndex] = [...matrixValues[columnIndex]];
          newValues[columnIndex][rowIndex] = value;
        } else {
          newValues[columnIndex] = [...matrixValues[columnIndex]];
          newValues[columnIndex][rowIndex] = 0;
        }

        updateMatrixValues(newValues);
      }
    },
    [matrixValues, sizeC, sizeR]
  );

  const getMatrixElementBlock = useCallback(
    (column: number, row: number): ReactElement => {
      const elemValue = matrixValues[column][row];

      return (
        <NumericTextField
          key={`matrix-elem-${column}-${row}`}
          label={`${row + 1}-${column + 1}`}
          value={elemValue}
          onChange={(value) => updateOneValue(column, row, value)}
          inputClassName={styles["matrix-elem-textfield"]}
          labelClassName={styles["matrix-elem-textfield-label"]}
          errorText={
            checkIsValidateErrorByMinMaxValue(elemValue)
              ? "Ошибка ввода"
              : undefined
          }
        />
      );
    },
    [matrixValues, updateOneValue]
  );

  const matrix = useMemo(() => {
    const elementsStructure: Array<Array<ReactElement>> = matrixValues.map(
      (columnValue, columnIndex) => {
        return columnValue.map((_rowValue, rowIndex) => {
          return getMatrixElementBlock(columnIndex, rowIndex);
        });
      }
    );

    return (
      <div style={{ display: "flex" }}>
        {elementsStructure.map((columnElement, columnIndex) => (
          <div key={`matrix-dom-column-${columnIndex}`}>{columnElement}</div>
        ))}
      </div>
    );
  }, [matrixValues]);

  const fillArray = useCallback(() => {
    const newValues = new Array(sizeC).fill(undefined).map((column) => {
      const newRowValues = new Array(sizeR)
        .fill(undefined)
        .map(
          () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
        );

      return newRowValues;
    });

    updateMatrixValues(newValues);
  }, [matrixValues, minValue, maxValue]);

  function clearAll() {
    const newValues = [...matrixValues].map((column) => {
      const newRowValues = new Array(column.length).fill(0);

      return newRowValues;
    });

    updateMatrixValues(newValues);
  }

  let logicTaskResultMessage: string =
    "В матрице нет элементов, которые входят во все строки, но не во все столбцы";
  if (logicTaskResult.length) {
    logicTaskResultMessage = `Элементы матрицы, входящие во все строки, но не во все столбцы: ${logicTaskResult.join(
      ", "
    )}`;
  }

  return (
    <div>
      <h1>Лабораторная работа № 8. Модификация двумерных массивов</h1>
      <div>
        <NumericTextField
          label="Количество рядов в матрице"
          value={sizeR}
          onChange={updateSizeR}
          min={1}
          max={10}
        />
        <NumericTextField
          label="Количество столбцов в матрице"
          value={sizeC}
          min={1}
          max={10}
          onChange={updateSizeC}
        />
        <NumericTextField
          label="Минимальное значение"
          value={minValue}
          onChange={updateMinValue}
        />
        <NumericTextField
          label="Максимальное значение"
          value={maxValue}
          onChange={updateMaxValue}
        />
        <div className={styles["controls"]}>
          <Button
            text="Заполнить нулевой матрицей"
            onClick={clearAll}
            disabled={minValue > 0 || maxValue < 0}
          />
          <Button text="Заполнить случайными числами" onClick={fillArray} />
        </div>
      </div>
      <hr />
      <div className={styles["matrix"]}>{matrix}</div>
      <hr />
      <span>{logicTaskResultMessage}</span>
    </div>
  );
}
