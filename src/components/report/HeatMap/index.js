import React, { Fragment, useMemo, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { removeSpace } from "../../../services/axios/utility";
import TrendLine from "Components/report/syncfusion/TrendLine";

import styles from "./styles.scss";
import classnames from "classnames";

const getColor = (val) => {
  if (val < 4) {
    return "#c00000"; // dark red
  }

  if (val < 5) {
    return "#e56965"; // lighter red
  }

  if (val < 7) {
    return "#4da9ef"; // blue
  }

  if (val < 8) {
    return "#8acbc1"; // lighter green
  }

  return "#00b7a2"; // solid green
};

const NoTrendData = () => (
  <div className={styles["no-trend"]}>
    <img
      className={styles["no-trend-img"]}
      src="/assets/img/report/eye-slash.png"
    />
    <span className={styles["no-trend-text"]}>Anonymity threshold not met</span>
  </div>
);

const HeatMap = ({ shCnt, data, chartWidth }) => {
  console.log(data);
  const colP = useMemo(() => {
    if (Object.keys(data).length > 0) {
      return 100 / (data[Object.keys(data)[0]].length + 1);
    }
    return 100;
  }, [data]);

  const [trendVisible, setTrendVisible] = useState({});
  const [answerVisible, setAnswerVisible] = useState([]);

  useEffect(() => {
    let temp = {};
    Object.keys(data).forEach((key, index) => {
      if (index > 0) {
        temp[removeSpace(key)] = false;
      }
      answerVisible.push(false);
    });
    // console.log(temp);
    setTrendVisible({ ...temp });
  }, [data]);

  const toggleTrendVisible = (selectedKey) => {
    const tempValue = !trendVisible[selectedKey];
    let temp = {};
    Object.keys(trendVisible).forEach((key) => {
      temp[key] = false;
    });

    temp[selectedKey] = tempValue;
    setTrendVisible({ ...temp });
  };

  const handleClickQuestionIcon = (index) => {
    if (answerVisible[index]) {
      answerVisible[index] = false;
    } else {
      for (let i = 0; i < answerVisible.length; i++) {
        answerVisible[i] = false;
      }
      answerVisible[index] = true;
    }
    setAnswerVisible([...answerVisible]);
  };

  return (
    <div className={styles.root}>
      {Object.keys(data).map((key, rowNum) => {
        const keyValue = removeSpace(key);
        const headerStyle =
          rowNum === 0
            ? { border: "none", background: "none", padding: 0 }
            : {};
        return (
          <div
            className={styles["heatmap-row-wrapper"]}
            key={`heatmap-row-wrapper-${keyValue}`}
            style={headerStyle}
          >
            <div
              key={`heatmap-row-${keyValue}`}
              className={classnames({
                [styles["map-row"]]: rowNum > 0,
                [styles["map-header-row"]]: rowNum === 0,
              })}
            >
              {rowNum === 0 ? (
                <div
                  className={styles["map-col"]}
                  style={{ width: `${colP}%` }}
                >
                  {key}
                </div>
              ) : (
                <div
                  className={styles["map-col-title"]}
                  style={{ width: `${colP}%` }}
                >
                  <div
                    className={styles.left}
                    role="button"
                    onClick={(e) => toggleTrendVisible(keyValue)}
                  >
                    <span className={styles.title}>{key}</span>
                    {rowNum > 1 && (
                      <span className={styles.expand}>
                        Expand{" "}
                        {trendVisible[keyValue] ? (
                          <FontAwesomeIcon icon={faChevronDown} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronRight} />
                        )}
                      </span>
                    )}
                  </div>

                  <div className={styles.right}>
                    <img
                      src="/assets/img/report/question-circle.png"
                      width="16"
                      height="16"
                      onClick={(e) => handleClickQuestionIcon(rowNum)}
                    />
                    {answerVisible[rowNum] && (
                      <div className={styles["row-answer"]}>
                        <div className={styles["row-answer-triangle"]}></div>
                        <div className={styles["row-answer-content"]}>
                          {rowNum === 1 &&
                            `The response rate is ${
                              data[key].length > 0 ? data[key][0].value : 0
                            }% out of a total ${shCnt} stakeholders that have been invited to respond`}
                          {rowNum > 1 &&
                            (data[key].length > 0 && data[key][0].question
                              ? `Question answered: "${data[key][0].question}"`
                              : `No question answered`)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {data[key].map((d, index) => {
                const style =
                  rowNum >= 2 && d.value > 0
                    ? { borderLeft: `3px solid ${getColor(Number(d.value))}` }
                    : {};
                return (
                  <div
                    key={`heatmap-col-${keyValue}-${index}`}
                    className={styles["map-col"]}
                    style={{ width: `${colP}%`, ...style }}
                  >
                    <span>
                      {d.value === 0 ? (
                        <NoTrendData />
                      ) : rowNum === 0 ? (
                        d.value
                      ) : rowNum === 1 ? (
                        `${d.value} %`
                      ) : (
                        `${d.value} / 10`
                      )}
                    </span>
                    {rowNum === 1 && d.value > 0 && (
                      <div className={styles["map-col-shcnt"]}>
                        {`out of ${shCnt} stakeholders`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {rowNum > 1 && (
              <div
                key={`heatmap-row-trend-${keyValue}`}
                className={classnames(styles["map-row"], {
                  [styles.show]: trendVisible[keyValue],
                  [styles.hide]: !trendVisible[keyValue],
                })}
              >
                <div
                  className={styles["map-col-trend"]}
                  style={{ width: `${colP}%` }}
                  onClick={(e) => toggleTrendVisible(keyValue)}
                ></div>
                {data[key].map((d, index) => (
                  <div
                    key={`heatmap-col-trend-${keyValue}-${index}`}
                    className={classnames(styles["map-col-trend"])}
                    style={{ width: `${colP}%` }}
                  >
                    {chartWidth > 0 && d.trend.length > 0 && (
                      <TrendLine
                        data={d.trend}
                        num={`${keyValue}-${index}`}
                        width={chartWidth}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HeatMap;
