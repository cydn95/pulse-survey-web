import React from "react";

import classnames from "classnames";
import styles from "./styles_table.scss";

const PercentBar = ({ value, className = "" }) => {
  return (
    <div
      className={classnames(
        className,
        styles["keythemes-table-percent-container"]
      )}
    >
      <div
        style={{ width: `${value}%` }}
        className={classnames(className, styles["keythemes-table-percent-bar"])}
      ></div>
    </div>
  );
};

const KeyThemesTable = ({ title = "", data = [], onVote, className }) => {
  const total = data.reduce((a, b) => ({ freq: a.freq + b.freq }));
  const totalFreq = total ? total.freq : 0;

  return (
    <div className={classnames(styles["keythemes-table-root"], className)}>
      <div className={styles["keythemes-table-header"]}>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "25%" }}
        >
          FREQUENCY
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "39%" }}
        >
          THEME
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "18%" }}
        >
          LIKE(UPVOTE)
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "18%" }}
        >
          DISLIKE(DOWNVOTE)
        </div>
      </div>
      <div className={styles["keythemes-table-content"]}>
        {data.map((d, index) => {
          const voteValue =
            d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].voteValue : "0";
          const id =
            d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].id : null;
          return (
            <React.Fragment key={`keythemes-table-${title}-${index}`}>
              {/* Mobile View start */}
              <div className={styles["keythemes-table-content-mobile"]}>
                <div className={styles["keythemes-table-content-mobile-key"]}>
                  {d.key}
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-percent"]}
                >
                  <PercentBar
                    className={styles["keythemes-table-content-mobile-bar"]}
                    value={totalFreq === 0 ? 0 : (d.freq / totalFreq * 100)}
                  />
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-action"]}
                >
                  <div className={styles["keythemes-table-percent-text"]}>
                    {totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)}%
                  </div>
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={
                        voteValue == 1
                          ? "/assets/img/report/like_on.png"
                          : "/assets/img/report/like_off.png"
                      }
                      width="16"
                      onClick={(e) => onVote(d.key, 1, id, voteValue)}
                    />
                    <span>{d.upvoteCount}</span>
                  </div>
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={
                        voteValue === -1
                          ? "/assets/img/report/dislike_on.png"
                          : "/assets/img/report/dislike_off.png"
                      }
                      width="16"
                      onClick={(e) => onVote(d.key, -1, id, voteValue)}
                    />
                    <span>{d.downvoteCount}</span>
                  </div>
                </div>
              </div>
              {/* Mobile View end */}
              <div className={styles["keythemes-table-content-row"]}>
                <div
                  style={{
                    width: "25%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <div className={styles["keythemes-table-percent-text"]}>
                    {totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)}%
                  </div>
                  <PercentBar value={totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)} />
                </div>
                <div
                  style={{ width: "39%" }}
                  className={styles["keythemes-table-content-col"]}
                >
                  {d.key}
                </div>
                <div
                  style={{ width: "18%" }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <img
                    src={
                      voteValue == 1
                        ? "/assets/img/report/like_on.png"
                        : "/assets/img/report/like_off.png"
                    }
                    width="16"
                    onClick={(e) => onVote(d.key, 1, id, voteValue)}
                  />
                  <span>{d.upvoteCount}</span>
                </div>
                <div
                  style={{ width: "18%" }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <img
                    src={
                      voteValue === -1
                        ? "/assets/img/report/dislike_on.png"
                        : "/assets/img/report/dislike_off.png"
                    }
                    width="16"
                    onClick={(e) => onVote(d.key, -1, id, voteValue)}
                  />
                  <span>{d.downvoteCount}</span>
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
