import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const TopSummary = ({ data, type }) => {
  return (
    <div className={styles["top-summary-root"]}>
      {data.map((d, index) =>
        index < 3 ? (
          <div
            key={`top-summary-${type}-${index}`}
            className={classnames(styles.item, styles[type])}
          >
            {d.topicValue}
          </div>
        ) : null
      )}
    </div>
  );
};

export default TopSummary;
