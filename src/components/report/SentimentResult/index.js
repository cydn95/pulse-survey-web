import React from "react";

import { ResponsiveSmile as Smile } from "./Smile";

import styles from "./styles.scss";

const SentimentResult = ({ data, labels }) => {
  return (
    <div className={styles["sentiment-result-root"]}>
      <div className={styles.top}>
        <span>Sentiment Results</span>
      </div>
      <div className={styles.content}>
        {data.map((d, index) => (
          <Smile
            key={`result-sentiment-${index}`}
            className={styles.donut}
            keySelector={(d) => d.name}
            valueSelector={(d) => d.count}
            width={100}
            height={100}
            sentiment={"happy"}
            subDriver={labels[index]}
            data={d}
          />
        ))}
      </div>
    </div>
  );
};

export default SentimentResult;
