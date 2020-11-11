import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const CultureResult = ({ data }) => {
  return (
    <div className={styles["top-culture-result-root"]}>
      {data.map((d, index) => (
        <div key={`culture-result-${index}`} className={styles.item}>
          <div>{d.culture}</div>
          <div
            className={styles.bar}
          >
            <div
              className={styles.progress}
              style={{
                width: `${d.result > 100 ? 100 : d.result}%`,
                background: d.result = 70 ? "#15bb59" : "#e50909",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CultureResult;
