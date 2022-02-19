import React, { useState, useEffect, useCallback, ReactElement } from "react";
import { Button, NumericTextField } from "../../../../common";
import {
  bubbleSort,
  findElementQ,
  getReverseNumber,
} from "./fourth-task.logic";

import styles from "./fourth-task.module.css";

export default function FourthTask() {
  const [size, updateSize] = useState<number>(30);
  const [values, updateValues] = useState<Array<number>>(
    new Array(size).fill(0)
  );
  const [arrayBox, updateArrayBox] = useState<ReactElement>(<></>);

  function sortArray() {
    const newValues = [...values];

    updateValues(bubbleSort(newValues));
  }

  function clearAll() {
    updateValues(new Array(size).fill(0));
  }

  function fillArray() {
    const newValues: number[] = [];

    for (let i = 0; i < values.length; i++) {
      newValues.push(Math.trunc(Math.random() * 10000));
    }

    updateValues(newValues);
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

  function checkAndReverseNumbers() {
    const newValues = [...values].map((num) => {
      const numberString = String(num);

      if (numberString.includes("2") && numberString.includes("3")) {
        return getReverseNumber(num);
      } else {
        return num;
      }
    });

    updateValues([...newValues]);
  }

  const getArrayItemBlock = useCallback(
    (index: number): ReactElement => {
      return (
        <div style={{ display: "flex" }}>
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
        {elementsStructure.map((columnElement) => (
          <div className={styles["array-result-box-column"]}>
            {columnElement}
          </div>
        ))}
      </div>
    );
  }, [size, values]);

  return (
    <div>
      <h1>Лабораторная работа № 6. Модификация одномерных массивов</h1>
      <hr />
      <p>
        Требуется определить массив целых чисел (например, размера 30),
        заполнить его случайными числами (в диапазоне от A до B, где A и B
        задаются в директивах #define) или ввести его элементы с клавиатуры.
        Найти минимальный элемент массива из всех элементов, обладающих
        свойством Q. Все элементы массива, обладающие свойством T, заменить на
        их обратные изображения (например, 123 заменить на 321). Отсортировать
        массив по возрастанию. После инициализации и каждого преобразования
        выводить массив на экран. Свойства Q и T задаются в вариантах задания.
        <br />
        <u>Индивидуальное задание:</u> Q: число является четным. T: число
        содержит в своем составе цифры 2 и 3.
      </p>
      <hr />
      <div>
        <NumericTextField
          label="Размерность массива"
          value={size}
          onChange={updateSize}
          max={100}
          min={1}
        />
      </div>
      <div className={styles["controls"]}>
        <Button
          text="Заполнить"
          onClick={fillArray}
          specialClassName={styles["button-margin"]}
        />
        <Button
          text="Отсортировать"
          onClick={sortArray}
          specialClassName={styles["button-margin"]}
        />
        <Button
          text="Заменить числа по условию T"
          onClick={checkAndReverseNumbers}
          specialClassName={styles["button-margin"]}
        />
        <Button
          text="Очистить"
          onClick={clearAll}
          specialClassName={styles["button-margin"]}
        />
      </div>
      <hr />
      <div>{arrayBox}</div>
      <hr />
      <div>
        <span>{`Минимальный чётный элемент массива: ${findElementQ(
          values
        )}`}</span>
      </div>
    </div>
  );
}
