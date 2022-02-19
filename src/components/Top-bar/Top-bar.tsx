import React, { ReactElement } from "react";
import { TABS } from "../../App";
import classnames from "../../common-functions/classnames";
import { Button } from "../common";

import styles from "./top-bar.module.css";

type TTopBarProps = {
  switchTab: (tabName: string) => void;
  activeTab: string;
};

export default function TopBar(props: TTopBarProps): ReactElement {
  const { switchTab, activeTab } = props;

  const {
    HOMEPAGE,
    FIRST_TASK,
    SECOND_TASK,
    THIRD_TASK,
    FOURTH_TASK,
    FIFTH_TASK,
    SIXTH_TASK,
  } = TABS;

  return (
    <div className={styles["top-bar"]}>
      <Button
        text="Главная"
        onClick={() => switchTab(HOMEPAGE)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === HOMEPAGE,
        })}
      />
      <Button
        text="Л/р 1"
        onClick={() => switchTab(FIRST_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === FIRST_TASK,
        })}
      />
      <Button
        text="Л/р 5"
        onClick={() => switchTab(SECOND_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === SECOND_TASK,
        })}
      />
      <Button
        text="Л/р 3"
        onClick={() => switchTab(THIRD_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === THIRD_TASK,
        })}
      />
      <Button
        text="Л/р 6"
        onClick={() => switchTab(FOURTH_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === FOURTH_TASK,
        })}
      />
      <Button
        text="Л/р 7"
        onClick={() => switchTab(FIFTH_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === FIFTH_TASK,
        })}
      />
      <Button
        text="Л/р 8"
        onClick={() => switchTab(SIXTH_TASK)}
        specialClassName={classnames({
          [styles["top-bar-item"]]: true,
          [styles["top-bar-item-active"]]: activeTab === SIXTH_TASK,
        })}
      />
    </div>
  );
}
