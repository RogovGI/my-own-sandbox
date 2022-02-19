import React, { useEffect, useState } from "react";
import { Button, NumericTextField } from "../../../../common";
import { sum1, sum2 } from "./third-task.logic";

import styles from "./third-task.module.css";

export default function ThirdTask() {
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [eps, setEps] = useState<number>(0);

  const [resultByMaxIndex, setResultByMaxIndex] = useState<number>(0);
  const [resultByEps, setResultByEps] = useState<number>(0);

  function calculate() {
    setResultByMaxIndex(sum1(maxIndex));
    setResultByEps(sum2(eps));
  }

  useEffect(() => {
    setResultByEps(0);
  }, [eps]);

  useEffect(() => {
    setResultByMaxIndex(0);
  }, [maxIndex]);

  return (
    <div>
      <h1>Лабораторная работа № 3. Числовые и функциональные ряды</h1>
      <hr />
      <p>
        Для бесконечного числового ряда: a<sub>1</sub> + a<sub>2</sub> + ... + a
        <sub>n</sub> члены которого вычисляются по формуле, соответствующей
        индивидуальному варианту, вычислить приближенную сумму двумя способами:
        сумму первых n членов ряда и сумму с точностью до eps (эпсилон) в двух
        разных функциях: double Sum1(int n); double Sum2(double eps).
        Запрещается использование функции pow() и условных операторов «if» и «?
        : ».
        <br />
        <u>Индивидуальное задание:</u> формула преобразованная для использования
        в программе: 1 - (2 % n) * 2) * (n / (n * n * n) + n + 1
      </p>
      <hr />
      <div className={styles["controls"]}>
        <NumericTextField
          label="Сумма первых элементов последовательности"
          value={maxIndex}
          onChange={setMaxIndex}
          min={1}
        />
        <NumericTextField
          label="Точность"
          value={eps}
          min={1}
          onChange={setEps}
        />
        <div className={styles["local-button"]}>
          <Button text="Вычислить" onClick={calculate} />
        </div>
      </div>
      <hr />
      <div className={styles["results"]}>
        <span>{`Сумма первых ${maxIndex} членов последовательности: ${resultByMaxIndex}`}</span>
        <span>{`Результат по заданной точности: ${resultByEps}`}</span>
      </div>
    </div>
  );
}
