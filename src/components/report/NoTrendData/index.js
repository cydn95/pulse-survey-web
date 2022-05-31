import React, { useState } from "react";

import styles from "./styles.scss";

const NoTrendData = ({ shCnt = 0, thresholdCnt = 3 }) => {
  const [tip, setTip] = useState(false);

  return (
    <div
      className={styles["no-trend"]}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <img
        className={styles["no-trend-img"]}
        src="/assets/img/report/eye-slash.png"
      />
      <span className={styles["no-trend-text"]}>
        Anonymity threshold not met
      </span>

      {tip && (
        <div className={styles["tip-answer"]}>
          <div className={styles["tip-answer-triangle"]}></div>
          <div className={styles["tip-answer-content"]}>
            {`${shCnt === 0 ? "No" : `Only ${shCnt}`} stakeholder${
              shCnt === 1 ? "" : "s"
              } ${
              shCnt === 1 ? "has" : "have"
              } responded. We need at least ${thresholdCnt}.`}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoTrendData;
