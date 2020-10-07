import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const FeedbackSummary = ({ data }) => {
  const percent = 97 / (data.column.length - 1);
  const offset = 200 / (data.column.length - 1);

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
            style={{width: index === 0 ? "200px" : `calc(${percent}% - ${offset}px)` }}
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

              if (c >= 80) {
                borderClass = styles.high;
              } else if (c >= 50) {
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
                  style={{
                    width:
                      colNum === 0 ? "200px" : `calc(${percent}% - ${offset}px)`,
                  }}
                >
                  {c > 100 ? 100 : c}
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
