import React from "react";

import styles from "./styles.scss";

import { getColorFromValue } from "Util/Utils";

const CultureResult = ({ data }) => {
  return (
    <div className={styles["top-culture-result-root"]}>
      {data.map((d, index) => {
        if (d.result <= 0) {
          return null;
        }

        return (
          <div key={`culture-result-${index}`} className={styles.item}>
            <div>{d.culture}</div>
            <div className={styles.bar}>
              <div
                className={styles.progress}
                style={{
                  width: `${d.result > 100 ? 100 : d.result}%`,
                  background: getColorFromValue(d.result / 10),
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CultureResult;
