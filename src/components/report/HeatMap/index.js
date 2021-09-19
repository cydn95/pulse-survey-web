import React, { Fragment, useMemo, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { removeSpace } from "../../../services/axios/utility";
import TrendLine from "Components/report/syncfusion/TrendLine";
import NoTrendData from "Components/report/NoTrendData";
import { getColorFromValue } from "Util/Utils";

import styles from "./styles.scss";
import classnames from "classnames";

const shouldExpand = (allData, data, threshold, admin) => {
  let res = 0;
  data.forEach((d, index) => {
    if (
      d.value > 0 &&
      // ((d.stakeholders && d.stakeholders.length >= threshold) || admin)
      ((allData['Response Rate'][index].stakeholders.length >= threshold) || admin)
    ) {
      res++;
    }
  });

  return res;
};

const HeatMap = ({
  shCnt,
  thresholdCnt,
  totalAnswered,
  data,
  admin,
  chartWidth,
  filter,
  shGroup,
  totalQuestionCntData,
}) => {
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

  const getTotalStakeholders = () => {
    let data = null;
    if (filter === "SHGroup") {
      data = shCnt.shgroup;
    }
    if (filter === "Team") {
      data = shCnt.team;
    }
    if (filter === "Organization") {
      data = shCnt.org;
    }

    if (data === null) {
      return 0;
    }

    let cnt = 0;
    for (let i = 0; i < Object.keys(data).length; i++) {
      cnt += data[Object.keys(data)[i]];
    }

    return cnt;
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
                    {rowNum > 1 &&
                      (shouldExpand(data, data[key], thresholdCnt, admin) > 0 ||
                        admin === true) && (
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
                            `The response rate is ${Math.round(
                              (totalAnswered / getTotalStakeholders()) * 100
                            )}% out of a total ${getTotalStakeholders()} stakeholders that have been invited to respond`}
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
                  rowNum >= 1 &&
                    ((d.value > 0 ||
                      d.stakeholders ||
                      d.stakeholders.length > thresholdCnt) ||
                      admin)
                    ? { borderLeft: `3px solid ${getColorFromValue(Number(rowNum === 1 ? (totalQuestionCntData[filter] ? (totalQuestionCntData[filter][index].cnt / totalQuestionCntData.totalCnt) * 10 : 0) : d.value))}` }
                    : {};

                let colVal = "";
                if (rowNum === 0) {
                  colVal = d.value;
                } else if (rowNum === 1) {
                  colVal = `${totalQuestionCntData[filter] ?
                    Math.round((totalQuestionCntData[filter][index].cnt / totalQuestionCntData.totalCnt) * 100)
                    : 0
                    } %`;
                } else {
                  if (
                    // (d.value > 0 &&
                    //   d.stakeholders &&
                    //   d.stakeholders.length >= thresholdCnt) ||
                    (data['Response Rate'][index].stakeholders.length >= thresholdCnt) ||
                    admin
                  ) {
                    colVal = `${d.value} / 10`;
                  } else {
                    colVal = (
                      <NoTrendData
                        shCnt={d.stakeholders ? d.stakeholders.length : 0}
                        thresholdCnt={thresholdCnt}
                      />
                    );
                  }
                }

                return (
                  <div
                    key={`heatmap-col-${keyValue}-${index}`}
                    className={styles["map-col"]}
                    style={{ width: `${colP}%`, ...style }}
                  >
                    <span className={classnames({ [styles['analysis-value']]: rowNum !== 1 })}>{colVal}</span>
                    {rowNum === 1 && (
                      <div className={styles["map-col-shcnt"]}>
                        {`${totalQuestionCntData[filter] ? totalQuestionCntData[filter][index].cnt : 0} out of ${totalQuestionCntData[filter] ? totalQuestionCntData.totalCnt : 0} questions`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {rowNum > 1 &&
              (shouldExpand(data, data[key], thresholdCnt, admin) > 0 ||
                admin === true) && (
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
                      {d.value > 0 &&
                        chartWidth > 0 &&
                        ((data['Response Rate'][index].stakeholders.length >= thresholdCnt) ||
                          admin) && (
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
