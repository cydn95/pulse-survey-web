import React, { Fragment } from "react";

import NoTrendData from "Components/report/NoTrendData";
import { getColorFromValue } from "Util/Utils";

import styles from "./styles.scss";

const CardMap = ({ title, data, field, admin, thresholdCnt, responseRateData }) => {
  // console.log(data, field, title);
  // console.log(responseRateData, thresholdCnt,  admin);
  return (
    <div className={styles["card-map-root"]}>
      <h2 className={styles["card-map-title"]}>{title}</h2>
      <div className={styles["card-map-content"]}>
        {field &&
          field.map((f, index) => {
            let colValue = '';
            let anonymity = false;

            if (title === "Response Rate") {
              colValue = data[index].totalCnt === 0 ? 0 : data[index].stakeholders.length / data[index].totalCnt;
            } else {
              if ((responseRateData[index].stakeholders.length >= thresholdCnt) || admin) {
                colValue = data[index].value;
              } else {
                anonymity = true;
                colValue = (
                  <NoTrendData
                    shCnt={data[index].stakeholders ? data[index].stakeholders.length : 0}
                    thresholdCnt={thresholdCnt}
                  />
                );
              }
            }

            return (
              <div
                key={`card-map-row-${index}`}
                className={styles["card-map-row"]}
              >
                <div className={styles["card-map-field"]}>{f.value}</div>
                {anonymity === true && colValue}
                {anonymity === false && (
                  <Fragment>
                    <div className={styles["card-map-value"]}>
                      {title === "Response Rate" ? Math.round(colValue * 100) : colValue}
                      {title === "Response Rate" && "%"}
                    </div>
                    <div className={styles["card-map-line"]}>
                      <div
                        className={styles["card-map-fill"]}
                        style={{
                          width: `${colValue * (title === "Response Rate" ? 100 : 10)
                            }%`,
                          background: `${getColorFromValue(data[index].value)}`
                        }}
                      ></div>
                    </div>
                  </Fragment>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CardMap;
