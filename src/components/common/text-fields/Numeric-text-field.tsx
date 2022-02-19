import React, { ReactElement } from "react";
import classnames from "../../../common-functions/classnames";

import styles from "./text-fields.module.css";

type TTextFieldProps = {
  onChange: (value: number) => void;
  value: number;
  disabled?: any;
  label?: string;
  errorText?: string;
  min?: number;
  max?: number;
  labelClassName?: string;
  inputClassName?: string;
  errorTextClassName?: string;
};

export default function TextField(props: TTextFieldProps): ReactElement {
  const {
    onChange,
    value,
    disabled = false,
    min,
    max,
    label = "",
    errorText = "",
    labelClassName = "",
    inputClassName = "",
    errorTextClassName = "",
  } = props;

  const booleanDisabled = Boolean(disabled);

  function onChangeAction(event: React.ChangeEvent<HTMLInputElement>): void {
    let newValueNumber = Number(event.target.value);

    if (min) {
      newValueNumber = Math.max(newValueNumber, min);
    }
    if (max) {
      newValueNumber = Math.min(newValueNumber, max);
    }

    onChange(newValueNumber);
  }

  return (
    <div className={styles["text-field"]}>
      <div
        className={classnames({
          [styles["text-field-label"]]: true,
          [styles["error"]]: errorText,
          [labelClassName]: labelClassName,
        })}
      >
        {label}
      </div>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={onChangeAction}
        className={classnames({
          [styles["text-field-input"]]: true,
          [styles["disabled"]]: booleanDisabled,
          [inputClassName]: inputClassName,
        })}
      />
      <div
        className={classnames({
          [styles["text-field-error-text"]]: true,
          [styles["disabled"]]: booleanDisabled,
          [errorTextClassName]: errorTextClassName,
        })}
      >
        {errorText}
      </div>
    </div>
  );
}
