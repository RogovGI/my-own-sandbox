import React from "react";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      <span className={styles["sign"]}>
        МТУСИ БСТ-1852 | Рогов Г.И. | вариант №18
      </span>
    </div>
  );
}
