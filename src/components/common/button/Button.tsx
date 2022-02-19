import React, { ReactElement } from "react";

import classnames from "../../../common-functions/classnames";

import styles from "./button.module.css";

type TButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: any;
  specialClassName?: string;
};

export default function Button(props: TButtonProps): ReactElement {
  const { text, onClick, disabled = false, specialClassName = "" } = props;

  const booleanDisabled = Boolean(disabled);

  return (
    <div
      className={classnames({
        [styles["common-button"]]: true,
        [styles["disabled"]]: booleanDisabled,
        [specialClassName]: specialClassName,
      })}
      onClick={booleanDisabled ? () => {} : onClick}
    >
      {text.toUpperCase()}
    </div>
  );
}
