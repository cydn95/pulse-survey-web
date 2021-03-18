import React from "react";

import { getColorFromValue } from "Util/Utils";

import classnames from "classnames";
import styles from "./styles_table.scss";

const PercentBar = ({ value }) => {
  const bg = getColorFromValue(value * 2);
  return (
    <div
      style={{ width: `${value * 10}%`, background: bg }}
      className={styles["keythemes-table-percent-bar"]}
    ></div>
  );
};

const KeyThemesTable = ({ title = "", data = [], onVote, className }) => {
  return (
    <div className={classnames(styles["keythemes-table-root"], className)}>
      <div className={styles["keythemes-table-header"]}>
        <div className={styles["keythemes-table-header-item"]}>Frequency</div>
        <div className={styles["keythemes-table-header-item"]}>Theme</div>
        <div className={styles["keythemes-table-header-item"]}>
          Like(Upvote)
        </div>
        <div className={styles["keythemes-table-header-item"]}>
          Dislike
          <br />
          (Downvote)
        </div>
      </div>
      <div className={styles["keythemes-table-content"]}>
        {data.map((d, index) => (
          <div
            key={`keythemes-table-${title}-${index}`}
            className={styles["keythemes-table-content-row"]}
          >
            <div
              className={classnames(styles["keythemes-table-content-col"], {
                [styles.odd]: index % 2 !== 0,
                [styles.even]: index % 2 === 0,
              })}
            >
              <PercentBar value={d.freq} />
            </div>
            <div
              className={classnames(styles["keythemes-table-content-col"], {
                [styles.odd]: index % 2 !== 0,
                [styles.even]: index % 2 === 0,
              })}
            >
              {d.key}
            </div>
            <div
              className={classnames(styles["keythemes-table-content-col"], {
                [styles.odd]: index % 2 !== 0,
                [styles.even]: index % 2 === 0,
              })}
            >
              <img src="/assets/img/survey/like.png" width="16" onClick={(e) => onVote(d.key, 1)}/>
              {d.upvoteCount}
            </div>
            <div
              className={classnames(styles["keythemes-table-content-col"], {
                [styles.odd]: index % 2 !== 0,
                [styles.even]: index % 2 === 0,
              })}
            >
              <img src="/assets/img/survey/dislike.png" width="16" onClick={(e) => onVote(d.key, -1)}/>
              {d.downvoteCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyThemesTable;
