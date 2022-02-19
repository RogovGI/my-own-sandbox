import React, { useState } from "react";

import { Button, NumericTextField } from "../../../../common";

import { firstTaskMainCalculation, TResultValue } from "./first-task.logic";

import styles from "./first-task.module.css";

export default function FirstTask() {
  const [fromValue, setFromValue] = useState<number>(-5);
  const [toValue, setToValue] = useState<number>(5);
  const [step, setStep] = useState<number>(0.1);
  const [resultOfCalculation, setResultOfCalculation] = useState<
    Array<TResultValue>
  >([]);
  const [personalTaskValue, setPersonalTaskValue] = useState<number>(0);

  function calculation() {
    const { mainCalculationResult, personalTaskCalculationResult } =
      firstTaskMainCalculation(fromValue, toValue, step);

    setResultOfCalculation([...mainCalculationResult]);
    setPersonalTaskValue(personalTaskCalculationResult);
  }

  function clearAll() {
    setPersonalTaskValue(0);
    setResultOfCalculation([]);
  }

  return (
    <div>
      <h1>
        Лабораторная работа № 1. Программирование циклических вычислительных
        процессов
      </h1>
      <hr />
      <p>
        Для данной функции составить программу построения таблицы значений
        функции при изменении аргумента от A = -5 до B = 5 с шагом H = 0,1.
        Значения A, B и H объявить как константы. В каждой строке выводить
        значение аргумента и соответствующее ему значение функции в
        форматированном виде с 4 знаками после запятой. Кроме того, в конце
        таблицы нужно напечатать отдельной строкой значение, которое требуется
        вычислить в соответствии с индивидуальным заданием. <br />{" "}
        <u>Индивидуальное задание:</u> Найти количество отрицательных значений
        функции, имеющих нечетную целую часть.
      </p>
      <hr />
      <div>
        <NumericTextField
          label="От"
          value={fromValue}
          onChange={setFromValue}
        />
      </div>
      <div>
        <NumericTextField label="До" value={toValue} onChange={setToValue} />
      </div>
      <div>
        <NumericTextField
          label="Шаг"
          value={step}
          min={0.001}
          onChange={setStep}
        />
      </div>
      <div className={styles["controls-container"]}>
        <Button
          text="Очистить"
          onClick={clearAll}
          disabled={!resultOfCalculation.length}
        />
        <Button text="Вычислить" onClick={calculation} />
      </div>
      {resultOfCalculation.length ? (
        <div>
          <hr />
          <h3>Результат</h3>
          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <tr>
                <td className={styles["table-column-title"]}>АРГУМЕНТ</td>
                <td className={styles["table-column-title"]}>ЗНАЧЕНИЕ</td>
              </tr>
              {resultOfCalculation.map(({ argument, value }) => {
                return (
                  <tr key={`${argument}_${value}`}>
                    <td>{argument.toFixed(1)}</td>
                    <td>{value.toFixed(4)}</td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  Количество отрицательных значений функции, имеющих нечетную
                  целую часть
                </td>
                <td>{personalTaskValue}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
