import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";
import { style } from "d3";

const Perception = ({ min, max }) => {
  return (
    <div className={styles["perception-root"]}>
      <div className={styles["title"]}>PERCEPTION</div>
      <div className={styles["line-wrapper"]}>
        <div
          className={styles["top-triangle"]}
          style={{ marginLeft: `${min}%` }}
        ></div>
        <div className={styles.line}></div>
        <div
          className={styles["bottom-triangle"]}
          style={{ marginLeft: `${max}%` }}
        ></div>
      </div>
      <div className={styles["footer"]}>REALITY</div>
    </div>
  );
};

export default Perception;
