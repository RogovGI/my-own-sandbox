import React, { useState, useEffect, useCallback, ReactElement } from "react";
import { Button, NumericTextField } from "../../../../common";
import { secondTaskLogic, TSecondTaskLogic } from "./second-task.logic";

import styles from "./second-task.module.css";

export default function SecondTask() {
  const [size, updateSize] = useState<number>(30);
  const [values, updateValues] = useState<Array<number>>(
    new Array(size).fill(0)
  );
  const [arrayBox, updateArrayBox] = useState<ReactElement>(<></>);

  const [minValue, updateMinValue] = useState<number>(-1000);
  const [maxValue, updateMaxValue] = useState<number>(1000);

  const [logicTaskResult, updateLogicTaskResult] = useState<TSecondTaskLogic>({
    elements: [],
    indexes: [],
  });

  useEffect(() => {
    updateLogicTaskResult(secondTaskLogic(values));
  }, [values]);

  function clearAll() {
    updateValues(new Array(size).fill(0));
  }

  function updateOneValue(index: number, value?: number): void {
    if (index < size) {
      const newValues: Array<number> = [...values];

      if (typeof value === "number" && !isNaN(value)) {
        newValues[index] = Number.isInteger(value) ? value : Math.trunc(value);
      } else {
        newValues[index] = 0;
      }

      updateValues([...newValues]);
    }
  }

  const getArrayItemBlock = useCallback(
    (index: number): ReactElement => {
      return (
        <div key={`array-item-${index}`} style={{ display: "flex" }}>
          <span>{`${index}:`}</span>
          <input
            type="number"
            onChange={(event) =>
              updateOneValue(index, Number(event.target.value))
            }
            value={values[index]}
          />
        </div>
      );
    },
    [values]
  );

  useEffect(() => {
    if (size !== values.length) {
      if (size > values.length) {
        const diff = size - values.length;

        updateValues([...values, ...new Array(diff).fill(0)]);
      } else {
        const diff = values.length - size;

        const newValues = [...values];
        newValues.length = values.length - diff;

        updateValues([...newValues]);
      }
    }
    const elementsStructure: Array<Array<ReactElement>> = [];

    for (let j = 0; j < size; j++) {
      const coordinates = (j / 10).toFixed(1);
      const columnIndex = Number(coordinates.slice(0, 1));
      const rowIndex = Number(coordinates.slice(-1));

      if (elementsStructure[columnIndex] === undefined) {
        elementsStructure[columnIndex] = [];
      }
      elementsStructure[columnIndex][rowIndex] = getArrayItemBlock(j);
    }

    updateArrayBox(
      <div className={styles["array-result-box"]}>
        {elementsStructure.map((columnElement, index) => (
          <div
            key={`column-${index}`}
            className={styles["array-result-box-column"]}
          >
            {columnElement}
          </div>
        ))}
      </div>
    );
  }, [size, values]);

  const fillArray = useCallback(() => {
    const newValues = new Array(size)
      .fill(undefined)
      .map(
        () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
      );

    updateValues(newValues);
  }, [minValue, maxValue, size]);

  return (
    <div>
      <h1>
        Лабораторная работа № 5. Определение характеристик одномерных массивов
      </h1>
      <hr />
      <p>
        Требуется определить массив целых чисел (например, размера 30),
        заполнить его случайными числами (в диапазоне от A до B, где A и B
        задаются в директивах #define) или ввести его элементы с клавиатуры и
        определить его характеристики в соответствии с вариантом.
        <br />
        <u>Индивидуальное задание:</u> Найти порядковые номера и сумму двух
        попарно различных наибольших элементов
      </p>
      <hr />
      <NumericTextField
        label="Размерность массива"
        min={1}
        max={100}
        value={size}
        onChange={updateSize}
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
        <Button text="Очистить" onClick={clearAll} />
        <Button text="Заполнить" onClick={fillArray} />
      </div>
      <hr />
      <div>{arrayBox}</div>
      <hr />
      {values.every((elem) => elem === 0) ? (
        <div>
          <span>
            Введите в массив хотя бы одно значение для запуска процесса
            аналитики
          </span>
        </div>
      ) : (
        <div className={styles["analytic-block"]}>
          <span>{`Индексы наибольших попарно различных элементов: ${logicTaskResult.indexes.join(
            ", "
          )}`}</span>
          <span>{`Наибольшие попарно различные элементы: ${logicTaskResult.elements.join(
            ", "
          )}`}</span>
        </div>
      )}
    </div>
  );
}
