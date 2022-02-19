import React, { useState, useEffect } from "react";
import { TextField } from "../../../../common";
import { fifthTaskLogic, TFifthTaskLogicResult } from "./fifth-task.logic";

import styles from "./fifth-task.module.css";

export default function FifthTask() {
  const [text, updateText] = useState<string>("");
  const [result, updateResult] = useState<TFifthTaskLogicResult>({
    withNumberWords: [],
    vowelLettersWordsCount: 0,
  });

  useEffect(() => {
    updateResult(fifthTaskLogic(text));
  }, [text]);

  const { withNumberWords, vowelLettersWordsCount } = result;

  return (
    <div>
      <h1>Лабораторная работа № 7. Обработка текстовых строк</h1>
      <hr />
      <p>
        Выделить в строке-предложении s все слова, разделенные символами
        разделителями «_.,;:\n\t!?». Обработать выделенные слова в соответствии
        с вариантом задания.
        <br />
        <u>Индивидуальное задание:</u> напечатать все слова, которые содержат
        хотя бы один арифметический знак и заканчиваются на цифру. Определить
        количество слов, содержащих все маленькие латинские гласные буквы.
      </p>
      <hr />
      <div>
        <TextField label="Введите текст" value={text} onChange={updateText} />
        <hr />
        <div className={styles["analytic-result-block"]}>
          <span>{`Количество слов, содержищих все латинские гласные буквы: ${vowelLettersWordsCount}`}</span>
          <span>{`Слова, содержащие хотя бы один арифметический знак и заканчиваются на цифру: ${
            withNumberWords.length ? withNumberWords.join("") : "нет"
          }`}</span>
        </div>
      </div>
    </div>
  );
}
