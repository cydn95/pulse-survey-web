import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const FeedbackSummary = ({ data }) => {
  return (
    <div className={styles["table"]}>
      <div className={styles["table__header"]}>
        {data.column.map((c, index) => (
          <div
            key={`hc-${index}`}
            className={
              index === 0
                ? styles["table__header__col1"]
                : styles["table__header__col2"]
            }
          >
            {c}
          </div>
        ))}
      </div>
      <div className={styles["table__content"]}>
        {data.data.map((row, rowNum) => (
          <div key={`cr-${rowNum}`} className={styles["table__content__row"]}>
            {row.map((c, colNum) => {
              let borderClass = "";

              if (c >= 7) {
                borderClass = styles.high;
              } else if (c >= 4) {
                borderClass = styles.medium;
              } else {
                borderClass = styles.low;
              }

              return (
                <div
                  key={`cc-${rowNum}-${colNum}`}
                  className={classnames(
                    {
                      [styles["table__content__row__col1"]]:
                        colNum === 0 ? true : false,
                      [styles["table__content__row__col2"]]:
                        colNum === 0 ? false : true,
                    },
                    borderClass
                  )}
                >
                  {c}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSummary;
