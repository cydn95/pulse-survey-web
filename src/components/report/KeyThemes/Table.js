import React from "react";

import { getColorFromValue } from "Util/Utils";

import classnames from "classnames";
import styles from "./styles_table.scss";

const PercentBar = ({ value, className = "" }) => {
  const bg = getColorFromValue(value * 2);
  return (
    <div
      style={{ width: `${value * 10}%`, background: bg }}
      className={classnames(className, styles["keythemes-table-percent-bar"])}
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
        {data.map((d, index) => {
          const voteValue = d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].voteValue : "0";
          const id = d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].id : null;
          return (
            <React.Fragment key={`keythemes-table-${title}-${index}`}>
              <div className={styles["keythemes-table-content-mobile"]}>
                <div className={styles["keythemes-table-content-mobile-key"]}>
                  {d.key}
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-percent"]}
                >
                  <span>Frequency</span>
                  <div
                    className={styles["keythemes-table-content-mobile-barc"]}
                  >
                    <PercentBar
                      className={styles["keythemes-table-content-mobile-bar"]}
                      value={d.freq}
                    />
                  </div>
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-action"]}
                >
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={voteValue == 1 ? "/assets/img/survey/like-solid.png" : "/assets/img/survey/like.png"}
                      width="16"
                      onClick={(e) => onVote(d.key, 1, id, voteValue)}
                    />
                    <span>{d.upvoteCount}</span>
                  </div>
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={voteValue === -1 ? "/assets/img/survey/dislike-solid.png" : "/assets/img/survey/dislike.png"}
                      width="16"
                      onClick={(e) => onVote(d.key, -1, id, voteValue)}
                    />
                    <span>{d.downvoteCount}</span>
                  </div>
                </div>
              </div>
              <div className={styles["keythemes-table-content-row"]}>
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
                  <img
                    src={voteValue == 1 ? "/assets/img/survey/like-solid.png" : "/assets/img/survey/like.png"}
                    width="16"
                    onClick={(e) => onVote(d.key, 1, id, voteValue)}
                  />
                  {d.upvoteCount}
                </div>
                <div
                  className={classnames(styles["keythemes-table-content-col"], {
                    [styles.odd]: index % 2 !== 0,
                    [styles.even]: index % 2 === 0,
                  })}
                >
                  <img
                    src={voteValue === -1 ? "/assets/img/survey/dislike-solid.png" : "/assets/img/survey/dislike.png"}
                    width="16"
                    onClick={(e) => onVote(d.key, -1, id, voteValue)}
                  />
                  {d.downvoteCount}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default KeyThemesTable;
