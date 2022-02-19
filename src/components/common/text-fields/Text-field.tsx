import React, { ReactElement } from "react";

import classnames from "../../../common-functions/classnames";

import styles from "./text-fields.module.css";

type TTextFieldProps = {
  onChange: (value: string) => void;
  value: string;
  disabled?: any;
  label?: string;
  errorText?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorTextClassName?: string;
};

export default function TextField(props: TTextFieldProps): ReactElement {
  const {
    onChange,
    value,
    disabled = false,
    label = "",
    errorText = "",
    labelClassName = "",
    inputClassName = "",
    errorTextClassName = "",
  } = props;

  const booleanDisabled = Boolean(disabled);

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
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
