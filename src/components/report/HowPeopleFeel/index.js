import React from "react";

import styles from "./styles.scss";

const HowPeopleFeel = ({ data }) => {
  return (
    <div className={styles["how-people-feel"]}>
      {data.map((d) => {
        let bgColor;
        if (d.value >= 75) {
          bgColor = "#00c756";
        } else if (d.value >= 51) {
          bgColor = "#4a66ac";
        } else if (d.value === 50) {
          bgColor = "#dddddd";
        } else if (d.value >= 25) {
          bgColor = "#d2c4e8";
        } else {
          bgColor = "#ff0000"
        }
        const percentStyle = {
          width: `${d.value}%`,
          background: bgColor
        };
        return (
          <div key={d.key} className={styles["wrapper"]}>
            <div className={styles.title}>{d.key}</div>
            <div className={styles["chart"]}>
              <div className={styles["percent"]} style={percentStyle}></div>
            </div>
          </div>
        );
      })}
      <div className={styles["percent-bar"]}>
        <div className={styles.percent}>0%</div>
        <div className={styles.percent}>20%</div>
        <div className={styles.percent}>40%</div>
        <div className={styles.percent}>60%</div>
        <div className={styles.percent}>80%</div>
        <div className={styles.percent}>100%</div>
      </div>
    </div>
  );
};

export default HowPeopleFeel;
