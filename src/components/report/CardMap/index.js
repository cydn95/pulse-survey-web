import React from "react";

import { getColorFromValue } from "Util/Utils";

import styles from "./styles.scss";

const CardMap = ({ title, data, field }) => {
  // console.log(data, field, title);
  return (
    <div className={styles["card-map-root"]}>
      <h2 className={styles["card-map-title"]}>{title}</h2>
      <div className={styles["card-map-content"]}>
        {field &&
          field.map((f, index) => {
            let colValue = '';

            if (title === "Response Rate") {
              colValue = data[index].totalCnt === 0 ? 0 : data[index].stakeholders.length / data[index].totalCnt;
            } else {
              colValue = data[index].value;
            }

            return (
              <div
                key={`card-map-row-${index}`}
                className={styles["card-map-row"]}
              >
                <div className={styles["card-map-field"]}>{f.value}</div>
                <div className={styles["card-map-value"]}>
                  {title === "Response Rate" ? colValue * 100 : colValue}
                  {title === "Response Rate" && "%"}
                </div>
                <div className={styles["card-map-line"]}>
                  <div
                    className={styles["card-map-fill"]}
                    style={{
                      width: `${
                        colValue * (title === "Response Rate" ? 100 : 10)
                      }%`,
                      background: `${getColorFromValue(data[index].value)}`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CardMap;
