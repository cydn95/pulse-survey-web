import React from "react";

import styles from "./styles.scss";

const CardMap = ({ title, data, field }) => {
  return (
    <div className={styles["card-map-root"]}>
      <h2 className={styles["card-map-title"]}>{title}</h2>
      <div className={styles["card-map-content"]}>
        {field && field.map((f, index) => {
          return (
            <div key={`card-map-row-${index}`}className={styles["card-map-row"]}>
              <div className={styles["card-map-field"]}>{f.value}</div>
              <div className={styles["card-map-value"]}>{data[index].value}</div>
              <div className={styles["card-map-line"]}>
                <div className={styles["card-map-fill"]} style={{ width: `${data[index].value * 10}%`}}>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardMap;
